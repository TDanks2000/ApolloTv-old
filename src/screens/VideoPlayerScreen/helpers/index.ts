import {EpisodeInfo} from '../../../@types';
import {episodeSQLHelper} from '../../../utils/database';

export const watchTimeBeforeSync = 80;

export const updateDB = async (
  currentTime: number,
  duration: number,
  anime_id: number,
  episode_info: EpisodeInfo,
  watched_amount?: number,
) => {
  const watchedAmount = parseFloat(
    (watched_amount ?? (currentTime / duration) * 100).toFixed(2),
  );

  if (isNaN(watchedAmount)) return;

  await episodeSQLHelper.updateTable({
    anime_id: anime_id,
    episode_number: episode_info.episode_number,
    watched: watchedAmount > watchTimeBeforeSync,
    watched_percentage:
      watchedAmount > 0 && watchedAmount > watchTimeBeforeSync
        ? 100
        : watchedAmount,
  });

  console.log(
    watchedAmount > 0 && watchedAmount > watchTimeBeforeSync
      ? 100
      : watchedAmount,
  );

  console.log(`Set watched to ${watchedAmount} for ${episode_info.id} in db`);
};

export type UPDATEDB = typeof updateDB;
