import {IReadableResult, MediaStatus} from 'apollotv-providers/dist/types';
import {AnimeByDate, SubOrDub} from '../../@types';
import {storage} from '../storage/cleint';

export const setSubOrDub = (value: SubOrDub): void => {
  switch (value) {
    case 'sub':
      console.log('setting sub to storage');
      storage.set('subOrDub', 'sub');
      break;
    case 'dub':
      console.log('setting dub to storage');
      storage.set('subOrDub', 'dub');
  }
};

export const getSubOrDub = (): SubOrDub => {
  const subOrDub = storage.getString('subOrDub') ?? 'sub';

  console.log(`gotten ${subOrDub} from storage`);
  return subOrDub as SubOrDub;
};

export const recentSearchs = (recentSearch?: string): string[] => {
  const maxItems = 5;
  const recentSearchs = storage.getString('recentSearchs')?.split(',') ?? [];

  if (recentSearch && !recentSearchs?.includes(recentSearch)) {
    // check if string is just empty spaces using regex to covert all empty space to 1 space
    if (recentSearch?.replace(/\s/g, '').length !== 0) {
      if (recentSearch && recentSearchs.length === maxItems) {
        recentSearchs.pop();
        recentSearchs.unshift(recentSearch);

        storage.set('recentSearchs', recentSearchs.join(','));
      } else if (recentSearch && recentSearchs.length < maxItems) {
        recentSearchs.unshift(recentSearch);
        storage.set('recentSearchs', recentSearchs.join(','));
      }
    }
  }

  return recentSearchs as string[];
};

export const RemoveFromRecentSearches = (recentSearch: string): string[] => {
  // find recentSearch in recentSearchs
  const recentSearchs = storage.getString('recentSearchs')?.split(',') ?? [];

  // remove recentSearch from recentSearchs
  const index = recentSearchs.indexOf(recentSearch);
  if (index !== -1) recentSearchs.splice(index, 1);

  // dont add empty string
  if (recentSearchs.length === 0) storage.delete('recentSearchs');
  else storage.set('recentSearchs', recentSearchs.join(','));

  return recentSearchs;
};

export const parseDeepLinks = (urlFragment: string) => {
  const tokenKey = '#access_token=';
  const tokenEndIndex = urlFragment.indexOf('&');

  if (urlFragment.includes(tokenKey) && tokenEndIndex !== -1) {
    const tokenStartIndex = urlFragment.indexOf(tokenKey) + tokenKey.length;
    const accessToken = urlFragment.substring(tokenStartIndex, tokenEndIndex);
    return accessToken;
  }

  return null; // Access token not found in the URL fragment
};

export const launchedBefore = () => {
  const launchedBefore = storage.getBoolean('launchedBefore') ?? false;
  if (launchedBefore === false) {
    storage.set('launchedBefore', true);
    return false;
  } else {
    return true;
  }
};

export const generateUUID = (): string => {
  const hexDigits = '0123456789abcdef';
  let uuid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4'; // Set the 14th character to '4'
    } else {
      uuid += hexDigits[Math.floor(Math.random() * 16)];
    }
  }
  return uuid;
};

interface AnimeInfo {
  id: string;
  malId: number;
  episode: number;
  airingAt: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
    userPreferred: string;
  };
  country: string;
  image: string;
  description: string | null;
  cover: string;
  genres: string[];
  color: string;
  rating: number | null;
  releaseDate: number | null;
  type: string;
}

export const structureAiringSchedule = (results: any[]): AnimeByDate => {
  const structuredObject: AnimeByDate = {};

  results?.forEach(anime => {
    const airingDate = new Date(anime.airingAt * 1000);
    const year = airingDate.getFullYear();
    const month = (airingDate.getMonth() + 1).toString().padStart(2, '0');
    const day = airingDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;

    if (!structuredObject[formattedDate]) {
      structuredObject[formattedDate] = [];
    }

    structuredObject[formattedDate].push(anime);
  });

  return structuredObject;
};

export const areAllNumbersSame = (...numbers: number[]): number | null => {
  if (numbers.length === 0) {
    return null;
  }

  const firstNumber = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== firstNumber) {
      return null;
    }
  }

  return firstNumber;
};

export const normalizeTitle = (title: string): string => {
  // Remove illegal characters for filenames
  const illegalCharsRegex = /[<>:"/\\|?*\x00-\x1F]/g;
  const sanitizedTitle = title.replace(illegalCharsRegex, '');

  // Replace all characters with one space
  const spaceRegex = /\s+/g;
  const titleWithSpaces = sanitizedTitle.replace(spaceRegex, ' ');

  // Replace the space with a hyphen
  const normalizedTitle = titleWithSpaces.trim().replace(/\s/g, '-');

  return normalizedTitle;
};

export const convert_result = (data: any) => {
  const res = {
    currentPage: data.data.Page.pageInfo.currentPage,
    hasNextPage: data.data.Page.pageInfo.hasNextPage,
    results: data.data.Page.media.map(
      (item: any): IReadableResult => ({
        id: item.id.toString(),
        malId: item.idMal,
        title:
          {
            romaji: item.title.romaji,
            english: item.title.english,
            native: item.title.native,
            userPreferred: item.title.userPreferred,
          } || item.title.romaji,
        status:
          item.status == 'RELEASING'
            ? MediaStatus.ONGOING
            : item.status == 'FINISHED'
            ? MediaStatus.COMPLETED
            : item.status == 'NOT_YET_RELEASED'
            ? MediaStatus.NOT_YET_AIRED
            : item.status == 'CANCELLED'
            ? MediaStatus.CANCELLED
            : item.status == 'HIATUS'
            ? MediaStatus.HIATUS
            : MediaStatus.UNKNOWN,
        image:
          item.coverImage?.extraLarge ??
          item.coverImage?.large ??
          item.coverImage?.medium,
        cover: item.bannerImage,
        popularity: item.popularity,
        description: item.description,
        rating: item.averageScore,
        genres: item.genres,
        color: item.coverImage?.color,
        totalChapters: item.chapters,
        volumes: item.volumes,
        type: item.format,
        releaseDate: item.seasonYear,
      }),
    ),
  };

  return res;
};
