import React from 'react';
import {
  TouchableOpacity,
  ViewToken,
  useWindowDimensions,
  FlatList,
  Pressable,
} from 'react-native';
import {
  HorizontalType,
  MangaPage,
  ReaderFlatListProps,
} from '../../../../@types';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import {ReaderSettingsContext} from '../../../../contexts/ReaderSettingsContext';

const VerticalFlatList: React.FC<ReaderFlatListProps> = ({
  flatListRef,
  currentPage,
  setCurrentPage,
  data,
}) => {
  const {hideControls, layoutMode, horizontalType, toggleControls} =
    React.useContext(ReaderSettingsContext);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
  };

  const onViewRef = React.useRef(
    async ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const page = viewableItems.pop();
      if (!page?.index && !(page?.index! + 1)) return;

      setCurrentPage(page!.index! + 1);
    },
  );

  const {height, width} = useWindowDimensions();

  const renderItem = (item: MangaPage) => {
    return (
      <Pressable
        style={{width, height}}
        onLongPress={toggleControls}
        delayLongPress={300}>
        <ImageZoom
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
          source={{
            uri: item.img,
            headers: {
              Referer: item?.headerForImage?.Referer,
            },
          }}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      inverted={horizontalType === HorizontalType.rtl}
      style={{
        position: 'relative',
        zIndex: 2,
      }}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      pagingEnabled={true}
      data={data}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={item => `page-image-${item.page}`}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default VerticalFlatList;
