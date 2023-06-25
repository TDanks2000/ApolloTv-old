export type TitleLanguageOptions =
  | 'english'
  | 'native'
  | 'romanji'
  | 'userPreferred';

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
}

export type RootStackParamList = {
  Home: undefined;
  Info: {id: string};
};

export type SectionTypes = 'trending' | 'popular' | 'top_rated';
