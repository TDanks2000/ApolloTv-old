import {RecentSearch, RecentSearchs, SubOrDub} from '../../@types';
import {storage} from '../storage/cleint';

export const setSubOrDub = (value: SubOrDub): void => {
  switch (value) {
    case 'sub':
      console.log('setting sub');
      storage.set('subOrDub', 'sub');
      break;
    case 'dub':
      console.log('setting dub');
      storage.set('subOrDub', 'dub');
  }
};

export const getSubOrDub = (): SubOrDub => {
  const subOrDub = storage.getString('subOrDub') ?? 'sub';

  console.log(`got ${subOrDub}`);
  return subOrDub as SubOrDub;
};

export const recentSearchs = (recentSearch?: string): string[] => {
  const maxItems = 5;
  // set 5 max recent searches if 5 already exists remove first item in array and push the new search to the front of the array
  const recentSearchs = storage.getString('recentSearchs')?.split(',') ?? [];

  if (recentSearch && !recentSearchs?.includes(recentSearch)) {
    if (recentSearch && recentSearchs.length === maxItems) {
      recentSearchs.pop();
      recentSearchs.unshift(recentSearch);

      storage.set('recentSearchs', recentSearchs.join(','));
    } else if (recentSearch && recentSearchs.length < maxItems) {
      recentSearchs.unshift(recentSearch);
      storage.set('recentSearchs', recentSearchs.join(','));
    }
  }

  return recentSearchs as string[];
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
