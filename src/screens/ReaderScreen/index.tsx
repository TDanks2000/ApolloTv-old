import React from 'react';
import {FlatList, Image, useWindowDimensions, ViewToken} from 'react-native';
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
import {
  BackButtonComponent,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
  Reader,
} from '../../components';
import {MangaPage, RootStackParamList} from '../../@types';
import {api, utils} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {API_BASE} from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'ReaderScreen'>;

type QueryData = {
  isPending: boolean;
  isError: boolean;
  data: MangaPage[] | undefined;
  error: Error | null;
};

const ReaderScreen: React.FC<Props> = ({route, navigation}) => {
  const params = route?.params;
  const {chapter_id, chapter_info, manga_id, manga_info, chapter_number} =
    params;
  const actualTitle = utils.getTitle(manga_info?.title);

  const [hideControls, toggleControls] = React.useReducer(
    controls => !controls,
    true,
  );
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [ltr, setLtr] = React.useState(true);
  const {setShowNavBar}: any = React.useContext(NavigationContext);

  const flatListRef = React.useRef<FlatList>(null);

  const {height, width} = useWindowDimensions();

  const fetcher = async () => {
    return await api.fetcher(
      `${API_BASE}/anilist-manga/read?id=${manga_id}&chapterId=${chapter_id}`,
    );
  };

  const {isPending, isError, data, error}: QueryData = useQuery({
    queryKey: ['ReaderScreen', chapter_id, manga_id],
    queryFn: fetcher,
  });

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
            headers: {
              Referer: item?.headerForImage?.Referer,
            },
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
    itemVisiblePercentThreshold: 95,
  };

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (error)
    return <MiddleOfScreenTextComponent text={error?.message ?? 'Error!'} />;

  const pagesLength = data?.length!;

  return (
    <Container>
      <FlatList
        style={{
          position: 'relative',
          zIndex: 2,
        }}
        getItemLayout={(data, index) => ({
          length: ltr ? width : height,
          offset: ltr ? width * index : height * index,
          index,
        })}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={ltr}
        pagingEnabled={true}
        data={data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `page-image-${item.page}`}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
      />

      <TopMetaInfo show={hideControls}>
        <BackButtonComponent isModal={false} />
        <TopMetaTextContainer>
          <TopMetaTitle numberOfLines={1}>{actualTitle}</TopMetaTitle>
          <TopMetaSubTitle>
            {chapter_info.title?.length < 1
              ? `Chapter ${chapter_number}`
              : chapter_info.title}
          </TopMetaSubTitle>
        </TopMetaTextContainer>
        <Reader.PageIndicator page={currentPage} hideControls={hideControls} />
      </TopMetaInfo>

      <Reader.Slider
        minimumValue={0}
        maximumValue={pagesLength}
        flatlistRef={flatListRef}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hideControls={hideControls}
      />

      <PangeChangeContainer>
        <Reader.PageChange
          current_page={currentPage}
          icon_name={ltr ? 'angle-left' : 'angle-up'}
          page_change_amount={-1}
          total_pages={pagesLength}
          setCurrentPage={setCurrentPage}
          flatlistRef={flatListRef}
          disableFN={() => {
            if (currentPage === 1) return true;
            return false;
          }}
          ltr={ltr}
        />
        <Reader.PageChange
          current_page={currentPage}
          icon_name={ltr ? 'angle-right' : 'angle-down'}
          page_change_amount={1}
          total_pages={pagesLength}
          setCurrentPage={setCurrentPage}
          flatlistRef={flatListRef}
          disableFN={() => {
            if (currentPage === pagesLength) return true;
            return false;
          }}
          ltr={ltr}
        />
      </PangeChangeContainer>
    </Container>
  );
};

export default ReaderScreen;
