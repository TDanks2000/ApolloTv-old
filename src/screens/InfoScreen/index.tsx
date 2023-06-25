import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info} from '../../components';
import {DescriptionComponent} from '../../components/Shared';
import {ScrollView} from '../../styles/sharedStyles';
import {EpisodesModal} from '../../modals';
import {InfoData} from '../../utils/TestData';
import {API_BASE} from '@env';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
  const navigate: any = useNavigation();
  const {id} = route.params;
  const [showEpisodesModal, setShowEpisodesModal] = React.useState(false);

  const fetcher = async () => {
    return await api.fetcher(`${API_BASE}/anilist/info/${id}`);
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['info', id],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (!id) return navigate.navigate('Home');
  }, []);

  if (isPending || isError) return null;

  return (
    <SafeAreaView>
      <ScrollView>
        <Info.Top
          title={data.title}
          rating={data.rating}
          poster_image={data.cover}
          key={`info-top-${data.id}`}
        />
        <Info.ContinueWatching />
        <Info.Options openEpisodesModal={() => setShowEpisodesModal(true)} />
        <Info.MetaInfo
          title={data.title}
          rating={data.rating}
          genres={data.genres}
          total_episodes={data.totalEpisodes}
          release_year={data.releaseDate}
          key={`info-meta-info-${data.id}`}
        />
        <DescriptionComponent description={data.description} />
      </ScrollView>
      <EpisodesModal
        episodes={data.episodes}
        visible={showEpisodesModal}
        setVisible={setShowEpisodesModal}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
