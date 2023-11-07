import {API_BASE} from '@env';
import {
  AnimeInfo,
  AniskipData,
  EpisodeInfo,
  sourceProviders,
} from '../../../@types';
import {api} from '../../../utils';

export const fetcher = async (
  isDownloaded: boolean,
  folderPath: string,
  episode_id: string,
  sourceProvider: sourceProviders,
  preferedVoice: 'sub' | 'dub',
) => {
  if (isDownloaded) return folderPath;
  try {
    const data = await api.fetcher(
      `${API_BASE}/anilist/watch?episodeId=${episode_id}&provider=${sourceProvider}`,
    );

    if (sourceProvider?.toLowerCase().includes('animepahe')) {
      let returnData = data?.sources?.filter(
        (source: any) => source.isDub === (preferedVoice === 'dub'),
      );
      returnData = {
        headers: data?.headers,
        sources: returnData,
      };

      if (returnData) return returnData;
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAniskip = async (
  anime_info: AnimeInfo,
  episode_info: EpisodeInfo,
  setSkipData: (data: any) => void,
  setSkipDataPending: (pending: boolean) => void,
) => {
  const data = await api.fetcher<AniskipData>(
    `${API_BASE}/aniskip/${anime_info.malId}/${episode_info.episode_number}`,
  );

  if (!data) {
    return {
      ending: undefined,
      opening: undefined,
    };
  }

  const skipTimes: AniskipData = JSON.parse(JSON.stringify(data));

  let opening;
  let ending;
  for (const skipTime of Object.values(skipTimes)) {
    if (skipTime?.skipType?.toLowerCase() === 'op') opening = skipTime;
    if (skipTime?.skipType?.toLowerCase() === 'ed') ending = skipTime;
    if (opening && ending) break; // Break if both opening and ending are found.
  }

  const returnData = {
    ending,
    opening,
  };

  setSkipData(returnData);
  setSkipDataPending(false);
};
