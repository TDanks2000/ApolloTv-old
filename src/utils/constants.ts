import {PlatformConstants} from 'react-native';
import {GENRES, MediaFormat, MediaSeason, MediaStatus} from '../@types';

const AniListClientID = {
  PROD: 13303, // apolloTv://login/:token
};

export const CLIENT_ID = (() => {
  return AniListClientID.PROD;
})();

export const ANILIST_ACCESS_TOKEN_STORAGE = `@anilist:access_token`;

export const Genres: GENRES[] = [
  GENRES.ACTION,
  GENRES.ADVENTURE,
  GENRES.CARS,
  GENRES.COMEDY,
  GENRES.DRAMA,
  GENRES.FANTASY,
  GENRES.HORROR,
  GENRES.MAHOU_SHOUJO,
  GENRES.MECHA,
  GENRES.MUSIC,
  GENRES.MYSTERY,
  GENRES.PSYCHOLOGICAL,
  GENRES.ROMANCE,
  GENRES.SCI_FI,
  GENRES.SLICE_OF_LIFE,
  GENRES.SPORTS,
  GENRES.SUPERNATURAL,
  GENRES.THRILLER,
];

export const MediaFormats: MediaFormat[] = [
  MediaFormat.TV,
  MediaFormat.TV_SHORT,
  MediaFormat.MOVIE,
  MediaFormat.SPECIAL,
  MediaFormat.OVA,
  MediaFormat.MUSIC,
  MediaFormat.NOVEL,
  MediaFormat.ONE_SHOT,
];

export const MediaStatuss: MediaStatus[] = [
  MediaStatus.ONGOING,
  MediaStatus.COMPLETED,
  MediaStatus.HIATUS,
  MediaStatus.CANCELLED,
  MediaStatus.NOT_YET_AIRED,
  MediaStatus.UNKNOWN,
];

export const MediaSeasons: MediaSeason[] = [
  MediaSeason.FALL,
  MediaSeason.SPRING,
  MediaSeason.SUMMER,
  MediaSeason.WINTER,
];
