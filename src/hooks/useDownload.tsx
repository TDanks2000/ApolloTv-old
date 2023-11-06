import {useState} from 'react';
import {AnimeInfo, EpisodeInfo, Quality, sourceProviders} from '../@types';
import {api, helpers, utils} from '../utils';
import {API_BASE} from '@env';
import {useDownloadQueue} from '../contexts/DownloadQueue';

const useDownload = (
  anime_info: AnimeInfo,
  episode_info: Pick<EpisodeInfo, 'title' | 'id' | 'episode_number'>,
  preferedQuality: Quality = '1080p',
  sourceProvider: sourceProviders = 'gogoanime',
  queue_id: string,
) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const {addToQueue, cancelDownload, isDownloading, queue, currentQueueId} =
    useDownloadQueue(); // Access the DownloadQueue

  const resetProgress = (interval: NodeJS.Timeout) => {
    clearInterval(interval);
  };

  let real_queue_id = queue_id.replaceAll(' ', '_');
  const download = async () => {
    try {
      const data = await api.fetcher(
        `${API_BASE}/anilist/watch?episodeId=${episode_info.id}&provider=${sourceProvider}`,
      );

      if (!data) return;

      let interval: NodeJS.Timeout;

      await addToQueue(
        {
          queue_id: real_queue_id,
          data: anime_info,
          episode_number: episode_info.episode_number!,
          episode_title:
            episode_info.title ?? `Episode ${episode_info.episode_number ?? 1}`,
          headers: data?.headers,
          sources: data?.sources,
          title: anime_info.title,
        },
        preferedQuality,
      );

      console.log({
        trueOrFalse:
          currentQueueId && progress && currentQueueId === real_queue_id,
        currentQueueId,
        progress,
        real_queue_id,
      });

      // if (currentQueueId && progress && currentQueueId === real_queue_id) {
      interval = setInterval(() => {
        console.log('test', progress);
        setProgress(progress);
        if (progress >= 100 || !isDownloading) {
          resetProgress(interval);
        }
      }, 500);
      // }
    } catch (error) {
      setError((error as Error).message);
      console.log(error);
    }
  };

  return {progress, download, error};
};

export default useDownload;
