import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import DownloadManager, {VideoData} from '../utils/download/downloadManager'; // Update the path to your DownloadManager file
import {Quality} from '../@types';

interface DownloadVideoData extends VideoData {
  queue_id: string;
}

interface DownloadQueueContextProps {
  queue: DownloadVideoData[];
  addToQueue: (video: DownloadVideoData, preferedQuality: Quality) => void;
  cancelDownload: () => void;
  isDownloading: boolean;
  currentQueueId?: string;
  progress: number;
}

const DownloadQueueContext = createContext<DownloadQueueContextProps>({
  queue: [],
  addToQueue: () => {},
  cancelDownload: () => {},
  isDownloading: false,
  currentQueueId: undefined,
  progress: 0,
});

export const useDownloadQueue = () => useContext(DownloadQueueContext);

export const DownloadQueueProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [quality, setQuality] = React.useState<Quality>();
  const [queue, setQueue] = useState<DownloadVideoData[]>([]);
  const [currentQueueId, setCurrentQueueId] = useState<string>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (queue.length > 0 && !isDownloading) {
      handleNextDownload();
    }
  }, [queue, isDownloading]);

  let downloadManager: DownloadManager | null = null;
  const handleNextDownload = async () => {
    if (queue.length > 0) {
      const nextVideo = queue[0];
      const newQueue = [...queue];
      newQueue.shift(); // Remove the first element (which will be processed)
      setQueue(newQueue);
      setCurrentQueueId(nextVideo.queue_id);

      setIsDownloading(true);

      downloadManager = new DownloadManager(
        nextVideo,
        () => {
          setIsDownloading(false);
        },
        () => {
          setIsDownloading(false);
        },
        quality ?? '1080p',
      );

      await downloadManager.downloadFile();
    }
  };

  const addToQueue = (video: DownloadVideoData, preferedQuality: Quality) => {
    setQueue(prevQueue => [...prevQueue, video]);
    setQuality(preferedQuality);
  };

  const cancelDownload = async () => {
    await downloadManager?.cancel();
    setIsDownloading(false);
    setQueue([]);
    return 'Download canceled';
  };

  const contextValue: DownloadQueueContextProps = {
    queue,
    addToQueue,
    cancelDownload,
    isDownloading,
    currentQueueId,
    progress,
  };

  return (
    <DownloadQueueContext.Provider value={contextValue}>
      {children}
    </DownloadQueueContext.Provider>
  );
};
