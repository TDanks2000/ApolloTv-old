import {FlatList} from 'react-native';
import {MangaPage} from './Manga';

export enum LayoutMode {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Multiple = 'multiple',
}

export type ReaderFlatListProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  ltr: boolean;
  inverted?: boolean;
  layoutMode?: LayoutMode;
  data?: MangaPage[];
  flatListRef: React.RefObject<FlatList>;
  toggleControls: React.DispatchWithoutAction;
};
