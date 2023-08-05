import {View, Text} from 'react-native';
import React from 'react';
import {FullMangaInfo, QueryManga, RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info, MangaInfo, MiddleOfScreenTextComponent} from '../../components';
import {MangaInfoData} from '../../utils/TestData';
import CharacterContainer from '../../containers/CastContainer';
import {ScrollView} from '../../styles/sharedStyles';
import {API_BASE} from '@env';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {InfoPageSkeleton} from '../../components/Skeletons';
import ChaptersModal from '../../modals/ChaptersModal';
import {DescriptionComponent} from '../../components/Shared';

import {Wrapper} from '../InfoScreen/InfoScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaInfo'>;

const MangaInfoScreen: React.FC<Props> = ({route, navigation}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const params = route?.params;
  const {id} = params;

  const fetcher = async () => {
    const mangaData = await api.fetcher(`${API_BASE}/anilist-manga/info/${id}`);

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
  }: QueryManga = useQuery({
    queryKey: ['mangaInfo', id],
    queryFn: fetcher,
  });

  if (isPending) return <InfoPageSkeleton />;
  if (!resData?.mangaData?.title)
    return (
      <MiddleOfScreenTextComponent text="There was an unexpected error " />
    );

  return (
    <SafeAreaView>
      <ScrollView>
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
