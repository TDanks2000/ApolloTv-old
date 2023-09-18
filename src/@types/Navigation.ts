import {NavigationProp} from '@react-navigation/native';
import {AnimeInfo, EpisodeInfo, sourceProviders} from '.';
import {Chapter, FullMangaInfo} from './Manga';

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

  news: {
    topic?: string;
  };

  newsInfo: {
    id: string;
    image?: string;
  };

  testingScreen: undefined;

  // SETTINGS
  VideoSettings: undefined;
  SyncingSettings: undefined;
  // END SETTINGS
};

export type StackNavigation = NavigationProp<RootStackParamList>;
