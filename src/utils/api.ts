import {API_BASE, ANALYTICS_URL} from '@env';
import {SectionTypes} from '../@types';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import axios from 'axios';

export const getSectionUrl = (
  type: SectionTypes,
  mediaType: 'ANIME' | 'MANGA' = 'ANIME',
) => {
  const apiUrl = `${API_BASE}/anilist`;
  const apiUrlManga = `${API_BASE}/anilist-manga`;

  if (mediaType === 'ANIME') {
    switch (type) {
      case 'trending':
        return apiUrl + '/trending';
      case 'popular':
        return apiUrl + '/popular';
      case 'top_rated':
        return apiUrl + '/top-rated';
      default:
        return apiUrl + '/trending';
    }
  }

  if (mediaType === 'MANGA') {
    switch (type) {
      case 'trending':
        return apiUrlManga + '/trending';
      case 'popular':
        return apiUrlManga + '/popular';
      case 'top_rated':
        return apiUrlManga + '/top-rated';
      default:
        return apiUrlManga + '/trending';
    }
  }

  return apiUrl + '/trending';
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
  const url =
    queries.type === 'MANGA'
      ? new URL(`${API_BASE}/anilist-manga/search`)
      : new URL(`${API_BASE}/anilist/advanced-search`);

  if (queries.type === 'MANGA') {
    const data = await fetcher<any>(`${url.href}${queries.query!}`);
    return data;
  }

  queries = {type: 'ANIME', ...queries};

  Object.entries(queries).forEach(([key, value]) => {
    if (!value || value.length < 1) return;
    if (key === 'genres' && value.length >= 1) {
      value = `[${value.map((v: string) => `"${v}"`)}]`;
    }
    url.searchParams.append(key, value);
  });

  const data = await fetcher<any>(
    url.href.replace('advanced-search/', 'advanced-search'),
  );

  return data;
};
