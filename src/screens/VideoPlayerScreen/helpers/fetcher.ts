import {API_BASE} from '@env';
import {api} from '../../../utils';
import {sourceProviders} from '../../../@types';

export const fetcher = async (
  episode_id: string,
  sourceProvider: sourceProviders,
  preferedVoice: 'sub' | 'dub',
) => {
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
