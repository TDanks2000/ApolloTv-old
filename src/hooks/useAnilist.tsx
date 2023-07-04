import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useAccessToken} from '../contexts';
import {storage} from '../utils';

export const useAnilist = (): Anilist | null => {
  const {accessToken} = useAccessToken();

  if (!accessToken) return null;
  return new Anilist(accessToken);
};
