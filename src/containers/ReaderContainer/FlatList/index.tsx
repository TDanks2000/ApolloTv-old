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
import {LayoutMode, MangaPage, ReaderFlatListProps} from '../../../@types';
import HorizontalFlatList from './Horizontal';
import VerticalFlatList from './Vertical';
import MultipleFlatList from './Multiple';

const FlatListContainer: React.FC<ReaderFlatListProps> = ({
  ltr,
  inverted,
  layoutMode,
  data,
  currentPage,
  setCurrentPage,
  flatListRef,
  toggleControls,
}) => {
  if (layoutMode === LayoutMode.Horizontal) {
    return (
      <HorizontalFlatList
        ltr={ltr}
        inverted={inverted}
        layoutMode={layoutMode}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
        toggleControls={toggleControls}
      />
    );
  }
  if (layoutMode === LayoutMode.Vertical) {
    return (
      <VerticalFlatList
        ltr={ltr}
        inverted={inverted}
        layoutMode={layoutMode}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
        toggleControls={toggleControls}
      />
    );
  }
  if (layoutMode === LayoutMode.Multiple) {
    return (
      <MultipleFlatList
        ltr={ltr}
        inverted={inverted}
        layoutMode={layoutMode}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        flatListRef={flatListRef}
        toggleControls={toggleControls}
      />
    );
  }

  return null;
};

export default FlatListContainer;
