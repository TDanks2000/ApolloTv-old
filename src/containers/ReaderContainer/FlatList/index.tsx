import {
  View,
  Text,
  FlatList,
  ViewToken,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  HorizontalType,
  LayoutMode,
  MangaPage,
  ReaderFlatListProps,
} from '../../../@types';
import HorizontalFlatList from './Horizontal';
import VerticalFlatList from './Vertical';
import MultipleFlatList from './Multiple';
import {ReaderSettingsContext} from '../../../contexts/ReaderSettingsContext';

const FlatListContainer: React.FC<ReaderFlatListProps> = ({
  data,
  currentPage,
  setCurrentPage,
  flatListRef,
}) => {
  const {layoutMode} = React.useContext(ReaderSettingsContext);

  if (layoutMode === LayoutMode.Horizontal) {
    return (
      <HorizontalFlatList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
      />
    );
  }
  if (layoutMode === LayoutMode.Vertical) {
    return (
      <VerticalFlatList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
      />
    );
  }
  if (layoutMode === LayoutMode.Multiple) {
    return (
      <MultipleFlatList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
      />
    );
  }

  return null;
};

export default FlatListContainer;
