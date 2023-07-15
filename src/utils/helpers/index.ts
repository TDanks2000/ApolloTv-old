import {RecentSearch, RecentSearchs, SubOrDub} from '../../@types';
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
