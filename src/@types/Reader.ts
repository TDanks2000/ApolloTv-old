import {FlatList} from 'react-native';
import {MangaPage} from './Manga';

export enum LayoutMode {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Multiple = 'multiple',
}

export enum HorizontalType {
  ltr = 'left_to_right',
  rtl = 'right_to_left',
  disabled = 'disabled',
}

export enum OrientationType {
  unlocked = 'unlocked',
  portrait = 'portrait',
  portrait_reverse = 'upside_down_portrait',
  locked_portrait = 'locked_portrait',
  landscape = 'landscape',
  locked_landscape = 'locked_landscape',
  landscape_left = 'landscape_left',
  landscape_right = 'landscape_right',
}

export type ReaderFlatListProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data?: MangaPage[];
  flatListRef: React.RefObject<FlatList>;
};
