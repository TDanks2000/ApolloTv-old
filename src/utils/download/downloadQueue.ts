import DownloadManager from './downloadManager';

class DownloadQueue {
  queue: Map<string, DownloadManager>;
  isProcessing: boolean;

  constructor() {
    this.queue = new Map();
    this.isProcessing = false;
  }

  enqueue(id: string, downloadManager: DownloadManager) {
    this.queue.set(id, downloadManager);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queue.size === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;

    const [nextId, nextDownload] = this.queue.entries().next().value;
    if (nextDownload) {
      try {
        await new Promise(async resolve => {
          try {
            await nextDownload.downloadFile().then(() => {
              resolve(null);
            });
          } catch (error) {
            // Handle or log the error as needed
            resolve(error);
          }
        });
        this.queue.delete(nextId);
      } catch (error) {
        // Handle any errors related to the promise creation or processing
      }
    }

    if (this.queue.size > 0) {
      this.processQueue();
    } else {
      this.isProcessing = false;
    }
  }

  async cancelDownload(id: string) {
    const download = this.queue.get(id);
    if (download) {
      await download.cancel();
      this.queue.delete(id);
      if (this.queue.size === 0) {
        this.isProcessing = false;
      }
      return 'Download canceled';
    }
    return 'No download found with the provided ID';
  }

  async cancelAllDownloads() {
    for (const [id, download] of this.queue) {
      await download.cancel();
    }
    this.queue.clear();
    this.isProcessing = false;
    return 'All downloads canceled';
  }
}

export default DownloadQueue;
