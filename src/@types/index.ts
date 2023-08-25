import {NavigationProp} from '@react-navigation/native';
import {Chapter, FullMangaInfo} from './Manga';

export type MediaTypes = 'ANIME' | 'MANGA';

export type TitleLanguageOptions =
  | 'english'
  | 'native'
  | 'romanji'
  | 'userPreferred';

export type sourceProviders = 'gogoanime' | '9anime' | 'zoro' | 'kickassanime';

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

export type TitleType = string | ITitleLanguageOptions;

export type CardProps = {
  title: TitleType;
  id: string;
  poster_image?: string;
  rating?: number;
  total_episodes?: number;
  color?: string;
  type?: string;
  release_year?: number;
  relation_type?: string;
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
  watched_percentage?: number;
  setEpisodeModalVisible: (value: boolean) => void;

  episodeDBEntry: any;

  anime_info: AnimeInfo;
  episodes: EpisodeInfo[];
}

export type RootStackParamList = {
  Home: {
    hasJustLoggedIn?: boolean;
  };
  Info: {
    id: string;
  };
  MangaInfo: {
    id: string;
  };
  Lists: undefined;
  Search: undefined;
  Settings: undefined;
  LoggingIn: {
    access_code?: string;
  };
  VideoPlayer: {
    episode_id: string;
    source_provider: sourceProviders;
    next_episode_id?: string;
    episode_info: EpisodeInfo;
    anime_info: AnimeInfo;
    watched_percentage?: number;
    episodes: EpisodeInfo[];
  };

  ReaderScreen: {
    chapter_number: number;
    manga_id: string;
    chapter_id: string;
    manga_info: FullMangaInfo;
    chapter_info: Chapter;
  };

  testingScreen: undefined;

  // SETTINGS
  VideoSettings: undefined;
  SyncingSettings: undefined;
  // END SETTINGS
};

export type StackNavigation = NavigationProp<RootStackParamList>;

export type SectionTypes = 'trending' | 'popular' | 'top_rated';

export interface EpisodeInfo {
  id: string;
  title: string | undefined;
  image?: string;
  episode_number?: number;
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
  data:
    | {
        mediaStatus: any;
        animeData: FullAnimeInfo | undefined;
      }
    | undefined;
  error: Error | null;
}

export interface QueryManga {
  isPending: boolean;
  isError: boolean;
  data:
    | {
        mediaStatus: any;
        mangaData: FullMangaInfo | undefined;
      }
    | undefined;
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

export interface SQLUpdateEpisodeData {
  id: string;
  watched: boolean;
  watched_percentage: number;
}

export type Quality = '1080p' | '720p' | '480p' | '360p' | 'HIGHEST' | 'LOWEST';

export interface SourceVideoOptions {
  url: string;
  isM3U8?: boolean;
  quality: Quality | string;
}

export type SettingsOptions = {
  title: string;
  value: string;
  onPress: () => void;
};

export type SettingsOptionsGroup = {
  title: string;
  options: SettingsOptions[];
};

export type SettingsSectionsType = {
  name: string;
  value: string;
  iconName?: string;
  selectedOption: string;
  setOption?: (value: any) => void;
  onPress?: () => void;

  hasSubOptions?: boolean;
  optionType?: 'option' | 'subOption';
  options?: {
    value: string;
    label: string;
  }[];
};

export type AniskipData = Aniskip[];

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

export type settings =
  | 'auto_skip_intro'
  | 'auto_skip_outro'
  | 'prefered_voice'
  | 'prefered_quality'
  | 'source_provider';

export type DropdownData<LabelType, ValueType> = {
  label: LabelType;
  value: ValueType;
  image?: string;
};

export * from './Manga';
