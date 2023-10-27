import React from 'react';
import {RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info, MangaInfo, MiddleOfScreenTextComponent} from '../../components';
import CharacterContainer from '../../containers/CastContainer';
import {RefreshControlStyled, ScrollView} from '../../styles/sharedStyles';
import {API_BASE} from '@env';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {InfoPageSkeleton} from '../../components/Skeletons';
import ChaptersModal from '../../modals/ChaptersModal';
import {DescriptionComponent} from '../../components/Shared';

import {Wrapper} from '../InfoScreen/InfoScreen.styles';
import {SettingsContext} from '../../contexts';
import {CardContainer} from '../../containers';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaInfo'>;

const MangaInfoScreen: React.FC<Props> = ({route, navigation}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const {sourceProviderManga} = React.useContext(SettingsContext);

  console.log(sourceProviderManga);
  const params = route?.params;
  const {id} = params;

  const fetcher = async () => {
    const mangaData = await api.fetcher(
      `${API_BASE}/anilist-manga/info/${id}?provider=${
        sourceProviderManga ?? 'mangadex'
      }`,
    );

    const returnData = {
      mangaData: mangaData,
    };

    return returnData;
  };

  const {
    isPending,
    isError,
    data: resData,
    error,
    refetch,
  } = useQuery({
    queryKey: ['mangaInfo', id, sourceProviderManga],
    queryFn: fetcher,
  });

  React.useEffect(() => {
    if (refreshing) {
      refetch();
      setRefreshing(isPending);
    }
  }, [refreshing]);

  if (isPending) return <InfoPageSkeleton />;
  if (!resData?.mangaData?.title)
    return (
      <MiddleOfScreenTextComponent text="There was an unexpected error " />
    );

  const onRefresh = () => {
    setRefreshing(true);
  };

  const data = resData?.mangaData;

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControlStyled refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Info.Top
          type="MANGA"
          poster_image={resData?.mangaData?.cover ?? resData.mangaData?.image}
          rating={91}
          title={resData.mangaData?.title}
        />

        <MangaInfo.Options
          chaptersLength={resData.mangaData?.chapters.length}
          manga_info={resData.mangaData}
          openChaptersModal={() => setOpenModal(true)}
        />

        {/* @ts-ignore */}
        <Info.MetaInfo type="MANGA" data={resData.mangaData} />

        <DescriptionComponent description={resData.mangaData.description} />

        <Wrapper>
          <CharacterContainer
            type="MANGA"
            characters={resData?.mangaData?.characters}
          />
        </Wrapper>

        {data?.relations?.length > 0 ? (
          <Wrapper>
            <CardContainer title="Related" data={data?.relations} />
          </Wrapper>
        ) : null}
        {data?.recommendations?.length > 0 ? (
          <Wrapper>
            <CardContainer
              title="You may also like"
              data={data?.recommendations}
            />
          </Wrapper>
        ) : null}
      </ScrollView>

      <ChaptersModal
        chapters={resData?.mangaData?.chapters}
        manga_info={resData?.mangaData}
        setVisible={setOpenModal}
        visible={openModal}
      />
    </SafeAreaView>
  );
};

export default MangaInfoScreen;
