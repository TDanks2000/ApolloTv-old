import {API_BASE} from '@env';
import {SectionTypes} from '../@types';

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
