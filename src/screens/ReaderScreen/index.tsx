import {FlatList, Image, useWindowDimensions, ViewToken} from 'react-native';
import React from 'react';
import {MangaPages} from '../../utils/TestData';
import {NavigationContext} from '../../contexts';
import {useFocusEffect} from '@react-navigation/native';
import {
  Container,
  PangeChangeContainer,
  TopMetaInfo,
  TopMetaSubTitle,
  TopMetaTextContainer,
  TopMetaTitle,
  TouchableOpacity,
} from './Reader.styles';
import {BackButtonComponent, Reader} from '../../components';
import {MangaPage} from '../../@types';

const ReaderScreen = () => {
  const [hideControls, toggleControls] = React.useReducer(
    controls => !controls,
    true,
  );
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [ltr, setLtr] = React.useState(true);
  const {setShowNavBar}: any = React.useContext(NavigationContext);

  const flatListRef = React.useRef<FlatList>(null);

  const {height, width} = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      setShowNavBar(false);
      return () => {
        setShowNavBar(true);
      };
    }, []),
  );

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
          }}
        />
      </TouchableOpacity>
    );
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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 5,
  };

  return (
    <Container>
      <FlatList
        style={{
          position: 'relative',
          zIndex: 2,
        }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={ltr}
        pagingEnabled={true}
        data={MangaPages}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `page-image-${item.page}`}
        onViewableItemsChanged={onViewRef.current}
      />

      <TopMetaInfo show={hideControls}>
        <BackButtonComponent isModal={false} />
        <TopMetaTextContainer>
          <TopMetaTitle numberOfLines={1}>One Piece</TopMetaTitle>
          <TopMetaSubTitle>Chapter 1</TopMetaSubTitle>
        </TopMetaTextContainer>
        <Reader.PageIndicator page={currentPage} hideControls={hideControls} />
      </TopMetaInfo>

      <Reader.Slider
        minimumValue={0}
        maximumValue={MangaPages.length - 1}
        flatlistRef={flatListRef}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hideControls={hideControls}
      />

      <PangeChangeContainer>
        <Reader.PageChange
          current_page={currentPage}
          icon_name="step-backward"
          page_change_amount={-1}
          total_pages={MangaPages.length - 1}
          setCurrentPage={setCurrentPage}
          flatlistRef={flatListRef}
          disableFN={() => {
            if (currentPage === 1) return true;
            return false;
          }}
        />
        <Reader.PageChange
          current_page={currentPage}
          icon_name="step-forward"
          page_change_amount={1}
          total_pages={MangaPages.length - 1}
          setCurrentPage={setCurrentPage}
          flatlistRef={flatListRef}
          disableFN={() => {
            if (currentPage === MangaPages.length) return true;
            return false;
          }}
        />
      </PangeChangeContainer>
    </Container>
  );
};

export default ReaderScreen;
