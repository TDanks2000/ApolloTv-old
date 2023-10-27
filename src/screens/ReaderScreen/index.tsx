import React, {useRef} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import {NavigationContext, SettingsContext} from '../../contexts';
import {useFocusEffect} from '@react-navigation/native';
import {
  BottomContainer,
  Container,
  IconContainer,
  PangeChangeContainer,
  TopMetaInfo,
  TopMetaSubTitle,
  TopMetaTextContainer,
  TopMetaTitle,
  TouchableOpacity,
  UnderSLider,
} from './Reader.styles';
import {
  BackButtonComponent,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
  Reader,
} from '../../components';
import {
  HorizontalType,
  LayoutMode,
  MangaPage,
  RootStackParamList,
} from '../../@types';
import {api, utils} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {API_BASE} from '@env';
import {ReaderContainer} from '../../containers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from '@gorhom/bottom-sheet';

type Props = NativeStackScreenProps<RootStackParamList, 'ReaderScreen'>;

type QueryData = {
  isPending: boolean;
  isError: boolean;
  data: MangaPage[] | undefined;
  error: Error | null;
};

const ReaderScreen: React.FC<Props> = ({route, navigation}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

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
  const [horizontalType, setHorizontalType] = React.useState<HorizontalType>(
    HorizontalType.disabled,
  );

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

  if (pagesLength <= 0)
    return (
      <MiddleOfScreenTextComponent text={'There was an unexpected Error!'} />
    );

  const onSettingsPress = () => {
    bottomSheetRef.current?.expand({
      stiffness: 65,
      damping: 13,
    });
  };

  return (
    <>
      <Container>
        <ReaderContainer.FlatListContainer
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={data}
          flatListRef={flatListRef}
          layoutMode={layoutMode}
          horizontalType={horizontalType}
          toggleControls={toggleControls}
          inverted={horizontalType === HorizontalType.rtl}
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
          <Reader.PageIndicator
            page={currentPage}
            hideControls={hideControls}
          />
        </TopMetaInfo>

        <BottomContainer>
          <Reader.Slider
            minimumValue={0}
            maximumValue={pagesLength}
            flatlistRef={flatListRef}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hideControls={hideControls}
          />

          <UnderSLider>
            <IconContainer onPress={onSettingsPress}>
              <Icon name={'cog'} color={'white'} size={15} />
            </IconContainer>
            <PangeChangeContainer>
              <Reader.PageChange
                current_page={currentPage}
                icon_name={
                  layoutMode === LayoutMode.Horizontal
                    ? 'angle-left'
                    : 'angle-up'
                }
                page_change_amount={-1}
                total_pages={pagesLength}
                setCurrentPage={setCurrentPage}
                flatlistRef={flatListRef}
                disableFN={() => {
                  if (currentPage === 1) return true;
                  return false;
                }}
              />
              <Reader.PageChange
                current_page={currentPage}
                icon_name={
                  layoutMode === LayoutMode.Horizontal
                    ? 'angle-right'
                    : 'angle-down'
                }
                page_change_amount={1}
                total_pages={pagesLength}
                setCurrentPage={setCurrentPage}
                flatlistRef={flatListRef}
                disableFN={() => {
                  if (currentPage === pagesLength) return true;
                  return false;
                }}
              />
            </PangeChangeContainer>
          </UnderSLider>
        </BottomContainer>
      </Container>
      <Reader.BottomSheet
        bottomSheetRef={bottomSheetRef}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        horizontalType={horizontalType}
        setHorizontalType={setHorizontalType}
      />
    </>
  );
};

export default ReaderScreen;
