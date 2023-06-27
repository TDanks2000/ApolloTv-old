import {NavigationProp} from '@react-navigation/native';

export type TitleLanguageOptions =
  | 'english'
  | 'native'
  | 'romanji'
  | 'userPreferred';

export type sourceProviders = 'gogoanime';

export interface ITitleLanguageOptions {
  english: string;
  native: string;
  romanji: string;
  userPreferred: string;
}

export interface CardProps {
  title: string | ITitleLanguageOptions;
  id: string;
  poster_image?: string;
  rating?: number;
  total_episodes?: number;
  color?: string;
  type?: string;
  release_year?: number;
}

export interface EpisodeCardProps {
  title: string | undefined;
  id: string;
  image?: string;
  episode_number?: number;
  watched_percentage?: number;
  setEpisodeModalVisible: (value: boolean) => void;

  anime_info: AnimeInfo;
}

export type RootStackParamList = {
  Home: undefined;
  Info: {
    id: string;
  };
  Lists: undefined;
  Search: undefined;
  Settings: undefined;
  VideoPlayer: {
    episode_id: string;
    source_provider: sourceProviders;

    episode_info: EpisodeInfo;
    anime_info: AnimeInfo;
  };
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
  title: string | ITitleLanguageOptions;
  image?: string;
  rating?: number;
  total_episodes?: number;
  color?: string;
  type?: string;
  release_year?: number;
  [x: string]: any;
}

export type SubOrDub = 'sub' | 'dub';
