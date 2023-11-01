import {Anilist} from '@tdanks2000/anilist-wrapper';
import {AnimeInfo, EpisodeInfo} from '../../../@types';
import {episodeSQLHelper} from '../../../utils/database';

export const watchTimeBeforeSync = 80;

export const updateDB = async (
  currentTime: number,
  duration: number,
  anime_id: number,
  episode_info: EpisodeInfo,
  checkedIfWatched: boolean,
) => {
  if (!checkedIfWatched) return;

  const watchedAmount = parseFloat(((currentTime / duration) * 100).toFixed(2));

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

  console.log(`Set watched to ${watchedAmount} for ${episode_info.id} in db`);
};

export type UPDATEDB = typeof updateDB;

export const checkIfWatchedFromDB = async (
  anime_info: AnimeInfo,
  episode_info: EpisodeInfo,
  setWatched: (watched: boolean) => void,
  checkedIfWatched: boolean,
) => {
  if (!checkedIfWatched) return false;
  const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
    anime_info.id,
  );

  if (!checkInDb) return setWatched(false);
  const find = checkInDb.find((item: any) => item.id === episode_info.id);
  if (find?.watched) setWatched(true);
  return setWatched(false);
};

export const updateAnilist = async (
  anime_info: AnimeInfo,
  episode_info: EpisodeInfo,
  watchedAnilist: boolean,
  setWatchedAnilist: (watched: boolean) => void,
  checkedIfWatched: boolean,
  privateMode: 'on' | 'off',
  accessToken?: string,
) => {
  if (privateMode === 'on') return false;
  if (!accessToken || watchedAnilist) return false;
  if (!checkedIfWatched) return false;
  const anilist = new Anilist(accessToken);
  const didUpdate = await anilist.user.updateMedia({
    mediaId: parseInt(anime_info.id),
    progress: episode_info.episode_number,
  });

  if (didUpdate) setWatchedAnilist(true);
};

export const createAndUpdateDB = async (
  anime_info: AnimeInfo,
  episode_info: EpisodeInfo,
  next_episode_id: string | undefined,
) => {
  await episodeSQLHelper.createTable();
  await episodeSQLHelper.insertEpisode({
    anime_id: Number(anime_info.id),
    episode_number: episode_info.episode_number,
    image: episode_info.image ?? '',
    watched_percentage: 0,
    watched: false,
    id: episode_info.id,
    title: episode_info.title ?? '',
    next_episode_id: next_episode_id,
  });
};
