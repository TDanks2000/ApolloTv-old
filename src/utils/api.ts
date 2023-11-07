import {ANALYTICS_URL, API_BASE} from '@env';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {EXTENSION_LIST, INFO} from 'apollotv-providers';
import axios from 'axios';
import {SectionTypes} from '../@types';

export const getSection = (
  type: SectionTypes,
  mediaType: 'ANIME' | 'MANGA' = 'ANIME',
  page: number = 1,
) => {
  const apiUrl = `${API_BASE}/anilist`;
  const apiUrlManga = `${API_BASE}/anilist-manga`;

  const anilist = new INFO.Anilist();
  let anilistD = new Anilist().search;

  if (mediaType === 'ANIME') {
    switch (type) {
      case 'trending':
        return anilist.getTrendingAnime(page);
      case 'popular':
        return anilist.getPopularAnime(page);
      case 'top_rated':
        return anilist.advancedSearch({
          type: 'ANIME',
          format: 'TV',
          sort: ['SCORE_DESC'],
          page,
          perPage: 20,
        });
      default:
        return anilist.getTrendingAnime(page);
    }
  }

  if (mediaType === 'MANGA') {
    switch (type) {
      case 'trending':
        return anilistD.advanced_manga({
          page,
          size: 50,
          sort: ['TRENDING_DESC'],
        });
      case 'popular':
        return anilistD.advanced_manga({
          page,
          size: 50,
          sort: ['POPULARITY_DESC'],
        });
      case 'top_rated':
        return anilistD.advanced_manga({
          page,
          size: 50,
          sort: ['SCORE_DESC'],
        });
      default:
        return anilistD.advanced_manga({
          page,
          size: 50,
          sort: ['TRENDING_DESC'],
        });
    }
  }
};

export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await fetch(url);
  return res.json() as Promise<T>;
};

export const fetchAnilistLists = async (
  accessToken: string | undefined,
  anilist: Anilist,
  type: 'MANGA' | 'ANIME' = 'ANIME',
) => {
  if (!accessToken) return [];

  const {data: ViewerData} = (await anilist.user.getCurrentUser()) as any;
  if (!ViewerData) return [];
  const name = ViewerData.Viewer.name;

  const CURRENTData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'CURRENT') as any)
      : (anilist.lists.manga(name, 'CURRENT') as any); // current = 0
  const PLANNINGData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'PLANNING') as any)
      : (anilist.lists.manga(name, 'PLANNING') as any); // planning = 1
  const COMPLETEDData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'COMPLETED') as any)
      : (anilist.lists.manga(name, 'COMPLETED') as any); // completed = 2
  const DROPPEDData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'DROPPED') as any)
      : (anilist.lists.manga(name, 'DROPPED') as any); // dropped = 3
  const PAUSEDData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'PAUSED') as any)
      : (anilist.lists.manga(name, 'PAUSED') as any); // paused = 4
  const REPEATINGData =
    type === 'ANIME'
      ? (anilist.lists.anime(name, 'REPEATING') as any)
      : (anilist.lists.manga(name, 'REPEATING') as any); // repeating = 5

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

export const getAiringSchedule = async (
  page: number = 1,
  perPage: number = 50,
  notYetAired: boolean = true,
) => {
  const url = `${API_BASE}/anilist/airing-schedule?notYetAired=${notYetAired}&page=${page}&perPage=${perPage}`;
  const url2 = `${API_BASE}/anilist/airing-schedule?notYetAired=${notYetAired}&page=${
    page + 1
  }&perPage=${perPage}`;
  const data1 = fetcher<any>(url);
  const data2 = fetcher<any>(url2);
  const [res, res2] = await Promise.all([data1, data2]);

  const combine = [...res?.results, ...res2?.results];

  return combine;
};

export const addToAnalytics = async (screen_width: number, uuid: string) => {
  await axios.request({
    url: ANALYTICS_URL,
    method: 'POST',
    data: JSON.stringify({
      uuid: uuid,
      screen_width: screen_width,
    }),
  });
};

export interface ASearchType {
  query?: string;
  year?: string;
  genres?: string[];
  season?: string;
  format?: string;
  status?: string;
  sort?: string[];
  type?: 'ANIME' | 'MANGA';
}

export const Search = async (queries: ASearchType) => {
  const anilist = new INFO.Anilist();

  const data = await anilist.advancedSearch({
    page: 1,
    perPage: 20,
    type: queries.type ?? 'ANIME',
    format: queries?.format,
    genres: queries?.genres?.length! <= 0 ? undefined : [],
    season: queries?.season,
    sort: queries?.sort,
    query: queries?.query?.length! <= 0 ? undefined : queries?.query,
    status: queries?.status,
    year: queries?.year ? parseInt(queries.year) : undefined,
  });

  return data;
};

export const getSources = async (episodeId: string, provider?: string) => {
  if (!episodeId) return {error: 'ID is required'};

  let anilist = generateAnilistMeta(provider);
  console.log(anilist);

  try {
    const res = await new INFO.Anilist().getMediaSources(
      'one-piece-dub-episode-1',
    );

    return res;
  } catch (err) {
    console.log((err as Error).message);
    return {error: (err as Error).message};
  }
};

const generateAnilistMeta = (provider: string | undefined = undefined) => {
  if (typeof provider === 'undefined') {
    return new INFO.Anilist(undefined);
  }

  let possibleProvider = EXTENSION_LIST.ANIME.find(
    p => p.metaData.name.toLowerCase() === provider.toLocaleLowerCase(),
  );

  return new INFO.Anilist(possibleProvider);
};
