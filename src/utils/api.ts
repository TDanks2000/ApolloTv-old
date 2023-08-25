import {API_BASE} from '@env';
import {SectionTypes} from '../@types';
import {Anilist} from '@tdanks2000/anilist-wrapper';

export const getSectionUrl = (type: SectionTypes) => {
  const apiUrl = `${API_BASE}/anilist`;

  switch (type) {
    case 'trending':
      return apiUrl + '/trending';
    case 'popular':
      return apiUrl + '/popular';
    case 'top_rated':
      return apiUrl + '/top-rated';
    default:
      return API_BASE + '/trending';
  }
};

export const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  return res.json();
};

export const fetchAnilistLists = async (
  accessToken: string | undefined,
  anilist: Anilist,
) => {
  if (!accessToken) return [];

  const {data: ViewerData} = (await anilist.user.getCurrentUser()) as any;
  if (!ViewerData) return [];
  const name = ViewerData.Viewer.name;

  const CURRENTData = anilist.lists.anime(name, 'CURRENT') as any; // current = 0
  const PLANNINGData = anilist.lists.anime(name, 'PLANNING') as any; // planning = 1
  const COMPLETEDData = anilist.lists.anime(name, 'COMPLETED') as any; // completed = 2
  const DROPPEDData = anilist.lists.anime(name, 'DROPPED') as any; // dropped = 3
  const PAUSEDData = anilist.lists.anime(name, 'PAUSED') as any; // paused = 4
  const REPEATINGData = anilist.lists.anime(name, 'REPEATING') as any; // repeating = 5

  const returnData: any = {
    current: await (await CURRENTData)?.data?.MediaListCollection?.lists,
    planning: await (await PLANNINGData)?.data?.MediaListCollection?.lists,
    completed: await (await COMPLETEDData)?.data?.MediaListCollection?.lists,
    dropped: await (await DROPPEDData)?.data?.MediaListCollection?.lists,
    paused: await (await PAUSEDData)?.data?.MediaListCollection?.lists,
    repeating: await (await REPEATINGData)?.data?.MediaListCollection?.lists,
    color: ViewerData.Viewer.options?.profileColor,
  };

  return returnData;
};
