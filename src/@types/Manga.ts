import {TitleType} from '.';

export interface FullMangaInfo {
  id: string;
  title: TitleType;
  malId: number;
  trailer: Trailer;
  image: string;
  popularity: number;
  color: string;
  cover: string;
  description: string;
  status: Status;
  releaseDate: number;
  startDate: EndDateClass;
  endDate: EndDateClass;
  rating: number;
  genres: string[];
  season: null;
  studios: any[];
  type: Type;
  recommendations: Recommendation[];
  characters: MangaCharacter[];
  relations: Relation[];
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  releaseDate: Date;
}

export interface MangaCharacter {
  id: number;
  role: Role;
  name: Name;
  image: string;
}

export interface Name {
  first: string;
  last: null | string;
  full: string;
  native: string;
  userPreferred: string;
}

export enum Role {
  Main = 'MAIN',
  Supporting = 'SUPPORTING',
}

export interface EndDateClass {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface Recommendation {
  id: number;
  malId: number | null;
  title: TitleType;
  status: Status;
  chapters: number | null;
  image: string;
  cover: string;
  rating: number;
  type: Type;
}

export enum Status {
  Completed = 'Completed',
  Ongoing = 'Ongoing',
}

export enum Type {
  Manga = 'MANGA',
}

export interface Relation {
  id: number;
  relationType: RelationType;
  malId: number | null;
  title: TitleType;
  status: Status;
  chapters: number | null;
  image: string;
  color: null | string;
  type: string;
  cover: string;
  rating: number;
}

export enum RelationType {
  Adaptation = 'ADAPTATION',
  Alternative = 'ALTERNATIVE',
  Character = 'CHARACTER',
  Prequel = 'PREQUEL',
  SideStory = 'SIDE_STORY',
  SpinOff = 'SPIN_OFF',
}

export interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface MangaPage {
  page: number;
  img: string;
  headerForImage: HeaderForImage;
}

export interface HeaderForImage {
  Referer: string;
}
