import React from 'react';
import {FlatList, Image, useWindowDimensions, ViewToken} from 'react-native';
import {NavigationContext, SettingsContext} from '../../contexts';
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
import {LayoutMode, MangaPage, RootStackParamList} from '../../@types';
import {api, utils} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {API_BASE} from '@env';
import {ReaderContainer} from '../../containers';

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

  // Reader Settings
  const {sourceProviderManga} = React.useContext(SettingsContext);

  const [hideControls, toggleControls] = React.useReducer(
    controls => !controls,
    true,
  );
  const [ltr, setLtr] = React.useState(true);
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>(
    LayoutMode.Horizontal,
  );

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const {setShowNavBar}: any = React.useContext(NavigationContext);

  const flatListRef = React.useRef<FlatList>(null);

  const {height, width} = useWindowDimensions();

  const fetcher = async () => {
    return await api.fetcher(
      `${API_BASE}/anilist-manga/read?id=${manga_id}&chapterId=${chapter_id}&provider=${
        sourceProviderManga ?? 'mangadex'
      }`,
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

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (error)
    return <MiddleOfScreenTextComponent text={error?.message ?? 'Error!'} />;

  const pagesLength = data?.length!;

  console.log(data?.length!);

  if (pagesLength <= 0)
    return (
      <MiddleOfScreenTextComponent text={'There was an unexpected Error!'} />
    );

  return (
    <Container>
      <ReaderContainer.FlatListContainer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        flatListRef={flatListRef}
        layoutMode={layoutMode}
        ltr={ltr}
        toggleControls={toggleControls}
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
