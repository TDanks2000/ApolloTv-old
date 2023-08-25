import {PlatformConstants} from 'react-native';

const AniListClientID = {
  PROD: 13303, // apolloTv://login/:token
};

export const CLIENT_ID = (() => {
  return AniListClientID.PROD;
})();

export const ANILIST_ACCESS_TOKEN_STORAGE = `@anilist:access_token`;
