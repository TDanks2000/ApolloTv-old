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
}

export type ReaderFlatListProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  horizontalType: HorizontalType;
  inverted?: boolean;
  layoutMode?: LayoutMode;
  data?: MangaPage[];
  flatListRef: React.RefObject<FlatList>;
  toggleControls: React.DispatchWithoutAction;
};
