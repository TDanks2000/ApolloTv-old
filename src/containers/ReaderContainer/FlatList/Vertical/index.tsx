import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewToken,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import {MangaPage, ReaderFlatListProps} from '../../../../@types';

const VerticalFlatList: React.FC<ReaderFlatListProps> = ({
  flatListRef,
  currentPage,
  ltr,
  setCurrentPage,
  toggleControls,
  data,
  inverted,
  layoutMode,
}) => {
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
      <TouchableOpacity
        style={{width, height}}
        onLongPress={toggleControls}
        delayLongPress={300}>
        <Image
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
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      inverted={inverted}
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
