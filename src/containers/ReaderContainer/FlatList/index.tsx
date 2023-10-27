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
  inverted,
  layoutMode,
  data,
  currentPage,
  setCurrentPage,
  flatListRef,
  toggleControls,
  horizontalType,
}) => {
  if (layoutMode === LayoutMode.Horizontal) {
    return (
      <HorizontalFlatList
        horizontalType={horizontalType}
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
        horizontalType={horizontalType}
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
        horizontalType={horizontalType}
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
