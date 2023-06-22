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
}
