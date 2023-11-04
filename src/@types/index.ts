import {NavigationProp} from '@react-navigation/native';
import {Chapter, FullMangaInfo} from './Manga';
import React from 'react';

export type MediaTypes = 'ANIME' | 'MANGA';

export type TitleLanguageOptions =
  | 'english'
  | 'native'
  | 'romanji'
  | 'userPreferred';

export type sourceProviders = 'gogoanime' | 'animepahe' | 'allanime';
export type mangaSourceProviders = 'mangadex' | 'mangasee' | 'mangakaklot';

export type MediaListStatus =
  | 'CURRENT'
  | 'PLANNING'
  | 'COMPLETED'
  | 'DROPPED'
  | 'PAUSED'
  | 'REPEATING';

export interface ITitleLanguageOptions {
  english?: string;
  romaji: string;
  native: string;
  userPreferred: string;
}

export type TitleType = ITitleLanguageOptions | string;

export type CardProps = {
  selectedList?: MediaListStatus;
  title: TitleType;
  id: string;
  poster_image?: string;
  rating?: number;
  total_episodes?: number;
  color?: string;
  type?: string;
  release_year?: number;
  start_date?: StartDate;
  relation_type?: string;
  progress?: number;
  list_type?: string;
  nextAiringEpisode?: {
    id: number;
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
    mediaId: number;
  };
  status?: MediaStatus;
  media_type?: 'ANIME' | 'MANGA';
};

export type MangaCardProps = {
  title: TitleType;
  id: string;
  poster_image?: string;
  rating?: number;
  total_chapters?: number;
  color?: string;
  type?: string;
  release_year?: number;
  relation_type?: string;
};

export interface EpisodeCardProps {
  title: string | undefined;
  id: string;
  image?: string;
  episode_number?: number;
  isFiller?: boolean;
  watched_percentage?: number;
  setEpisodeModalVisible: (value: boolean) => void;

  episodeDBEntry: any;

  anime_info: AnimeInfo;
  episodes: EpisodeInfo[];
}

export type SectionTypes = 'trending' | 'popular' | 'top_rated';

export interface EpisodeInfo {
  id: string;
  title: string | undefined;
  image?: string;
  episode_number?: number;
  isFiller?: boolean;
  [x: string]: any;
}

export interface AnimeInfo {
  id: string;
  malId: number;
  title: TitleType;
  image?: string;
  rating?: number;
  total_episodes?: number;
  color?: string;
  type?: string;
  release_year?: number;

  [x: string]: any;
}

export type SubOrDub = 'sub' | 'dub';

export interface ContinueWatching {
  watched_percentage: number;
  episode_length: number;

  episode_id: string;
  anime_info: AnimeInfo;
  episode_info: EpisodeInfo;
  source_provider: sourceProviders;
  title: string | undefined;
  image?: string;
}

export type RecentSearch = string;

export interface RecentSearchs {
  SearchText: RecentSearch;
}

export interface FullAnimeInfo {
  id: string;
  title: TitleType;
  malId: number;
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  image: string;
  popularity: number;
  color: string;
  cover: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: StartDate;
  endDate: EndDate;
  nextAiringEpisode: NextAiringEpisode;
  totalEpisodes: number;
  currentEpisode: number;
  rating: number;
  duration: number;
  genres: string[];
  season: string;
  studios: string[];
  subOrDub: string;
  type: string;
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  mappings: Mappings;
  episodes: Episode[];
}

export interface StartDate {
  year: number;
  month: number;
  day: number;
}

export interface EndDate {
  year: any;
  month: any;
  day: any;
}

export interface NextAiringEpisode {
  airingTime: number;
  timeUntilAiring: number;
  episode: number;
}

export interface Recommendation {
  id: number;
  malId: number;
  title: TitleType;
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
}

export interface Character {
  id: number;
  role: string;
  name: Name;
  image: string;
  voiceActors: VoiceActor[];
}

export interface Name {
  first: string;
  last?: string;
  full: string;
  native?: string;
  userPreferred: string;
}

export interface VoiceActor {
  id: number;
  language: string;
  name: Name;
  image: string;
}

export interface Relation {
  id: number;
  relationType: string;
  malId?: number;
  title: TitleType;
  status: string;
  episodes?: number;
  image: string;
  color: string;
  type: string;
  cover: string;
  rating: number;
}

export interface Mappings {
  mal: number;
  anidb: number;
  kitsu: number;
  anilist: number;
  thetvdb: number;
  anisearch: number;
  livechart: number;
  'notify.moe': string;
  'anime-planet': string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  image: string;
  airDate: string;
}

export interface QueryAnime {
  isPending: boolean;
  isError: boolean;
  data: {
    mediaStatus: any;
    animeData: FullAnimeInfo | undefined;
  };
  error: Error | null;
}

export interface QueryManga {
  isPending: boolean;
  isError: boolean;
  data: {
    mediaStatus: any;
    mangaData: FullMangaInfo | undefined;
  };
  error: Error | null;
}

export interface IUseAcessToken {
  accessToken: string | undefined;
  setAccessToken: (value: string) => void;
  checkedForToken: boolean;
}

export interface SQLEpisodeData {
  id: string;
  title: string;
  anime_id: number;
  image: string;
  episode_number: number | undefined;
  next_episode_id: string | undefined;
  watched: boolean;
  watched_percentage: number;
}

export type SQLUpdateEpisodeData = Pick<
  SQLEpisodeData,
  'watched' | 'watched_percentage' | 'anime_id' | 'episode_number'
>;

export type Quality = '1080p' | '720p' | '480p' | '360p' | 'HIGHEST' | 'LOWEST';
export type AbnormalQuality = 'mp4' | 'hls';

export interface SourceVideoOptions {
  url: string;
  isM3U8?: boolean;
  quality: Quality | AbnormalQuality | string;
}

export type AniskipData = {
  [x: string]: Aniskip;
};

export interface Aniskip {
  episodeLength: number;
  interval: AniskipInterval;
  skipId: string;
  skipType: 'op' | 'ed';
}

export interface AniskipInterval {
  endTime: number;
  startTime: number;
}

export type DropdownData<LabelType, ValueType> = {
  label: LabelType;
  value: ValueType;
  image?: string;
};

export interface SQLNewEpisodeData {
  anime_id: number;
  title: string;
  checked: boolean;
  checkedAt: string;
  nextCheckAt: string;
  currentEpisodes: number;
  latestEpisode: EpisodeInfo;
}

export interface SQLUpdateNewEpisodeData {
  anime_id: number;
  checked: boolean;
  checkedAt: string;
  nextCheckAt: string;
  currentEpisodes: number;
  latestEpisode: EpisodeInfo;
}

export interface ANNRecentFeed {
  title: string;
  id: string;
  uploadedAt: string;
  topics: Topic[];
  preview: Preview;
  thumbnail: string;
  url: string;
}

export interface Preview {
  intro: string;
  full: string;
}

export enum Topic {
  Anime = 'anime',
  Games = 'games',
  Industry = 'industry',
  LiveAction = 'live-action',
  Manga = 'manga',
  Music = 'music',
  Novels = 'novels',
  People = 'people',
}

export interface ANNInfo {
  id: string;
  title: string;
  uploadedAt: string;
  intro: string;
  description: string;
  thumbnail: string;
  url: string;
}

export * from './Navigation';
export * from './Manga';

// Update the AnimeByDay type
export interface AnimeByDate {
  [date: string]: AnimeInfo[];
}

export enum GENRES {
  ACTION = 'Action',
  ADVENTURE = 'Adventure',
  CARS = 'Cars',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  MAHOU_SHOUJO = 'Mahou Shoujo',
  MECHA = 'Mecha',
  MUSIC = 'Music',
  MYSTERY = 'Mystery',
  PSYCHOLOGICAL = 'Psychological',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  SLICE_OF_LIFE = 'Slice of Life',
  SPORTS = 'Sports',
  SUPERNATURAL = 'Supernatural',
  THRILLER = 'Thriller',
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
}

export enum MediaStatus {
  ONGOING = 'RELEASING',
  COMPLETED = 'FINISHED',
  HIATUS = 'HIATUS',
  CANCELLED = 'CANCELLED',
  NOT_YET_AIRED = 'NOT_YET_RELEASED',
  UNKNOWN = 'Unknown',
}

export enum MediaSeason {
  WINTER = `WINTER`,
  SPRING = `SPRING`,
  SUMMER = `SUMMER`,
  FALL = `FALL`,
}

export type UseStateType<T> = ReturnType<typeof React.useState<T>>;

export type Point100 = number;
// An integer from 0 to 100

export type Point10Decimal = number;
// A float from 0 to 10 with 1 decimal place

export type Point10 = number;
// An integer from 0 to 10

export type Point5 = 0 | 1 | 2 | 3 | 4 | 5;
// An integer from 0 to 5. Should be represented in Stars

export type Point3 = 0 | 1 | 2 | 3;
// An integer from 0 to 3. Should be represented in Smileys.
// 0 => No Score, 1 => :(, 2 => :|, 3 => :)

export enum PointValues {
  // An integer from 0-100
  Point_100 = 'Point_100',
  // A float from 0-10 with 1 decimal place
  Point_100_Decimal = 'Point_100_Decimal',
  // An integer from 0-10
  Point_10 = 'Point_10',
  // An integer from 0-5. Should be represented in Stars
  Point_5 = 'Point_5',
  // An integer from 0 to 3. Should be represented in Smileys.
  // 0 => No Score, 1 => :(, 2 => :|, 3 => :)
  Point_3 = 'Point_3',
}

export type PointType =
  | PointValues.Point_100
  | PointValues.Point_100_Decimal
  | PointValues.Point_10
  | PointValues.Point_5
  | PointValues.Point_3;

export * from './Services';
export * from './Reader';
export * from './Video';
export * from './Settings';
