import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useRef,
} from 'react';
import DownloadManager, {VideoData} from '../utils/download/downloadManager'; // Update the path to your DownloadManager file
import {Quality} from '../@types';
import {useMap} from '../hooks';
import {event} from '../utils';

interface DownloadVideoData extends VideoData {
  queue_id: string;
}

interface DownloadQueueContextProps {
  addToQueue: (queue_id: string, downloadManager: DownloadManager) => void;
  removeFromQueue: (queue_id: string) => void;
}

const DownloadQueueContext = createContext<DownloadQueueContextProps>({
  addToQueue: () => {},
  removeFromQueue: () => {},
});

export const useDownloadQueue = () => useContext(DownloadQueueContext);

export const DownloadQueueProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [queue, queueActions] = useMap<string, DownloadManager>();
  const [isProcessing, setIsProcessing] = useState(false);

  const addToQueue = (queue_id: string, downloadManager: DownloadManager) => {
    queueActions.add(queue_id, downloadManager);
  };

  const removeFromQueue = (queue_id: string) => {
    queueActions.remove(queue_id);
  };

  const emitProgress = (id: string, progress: number) => {
    event.emit(`progress_${id}`, {
      id: id,
      progress: progress,
    });
  };

  const handleNextItem = () => {
    return new Promise(async (resolve, reject) => {
      if (queue.size > 0 && !isProcessing) {
        const [nextId, nextDownload]: [string, DownloadManager] = queue
          .entries()
          .next().value;

        if (nextDownload) {
          try {
            setIsProcessing(true);

            let interval: NodeJS.Timeout;
            interval = setInterval(() => {
              const progress = nextDownload.progress;
              emitProgress(nextId, progress);
              if (progress === 100) {
                clearInterval(interval);
              }
              return progress;
            }, 500);

            await new Promise((resolveTask, rejectTask) => {
              nextDownload
                .downloadFile()
                .then(value => {
                  resolveTask(value);
                })
                .catch(error => {
                  rejectTask(error);
                });
            });

            queueActions.remove(nextId);
            setIsProcessing(false);
            resolve('Download completed successfully');
          } catch (error) {
            console.error(error);
            setIsProcessing(false);
            queueActions.remove(nextId);
            reject('Error processing the download');
          }
        } else {
          setIsProcessing(false);
          resolve('No item to process');
        }
      } else {
        resolve('No items in the queue or already processing');
      }
    });
  };

  useEffect(() => {
    if (queue.size > 0 && !isProcessing) {
      handleNextItem();
    }
  }, [queue, isProcessing]);

  const contextValue: DownloadQueueContextProps = {
    addToQueue,
    removeFromQueue,
  };

  return (
    <DownloadQueueContext.Provider value={contextValue}>
      {children}
    </DownloadQueueContext.Provider>
  );
};
