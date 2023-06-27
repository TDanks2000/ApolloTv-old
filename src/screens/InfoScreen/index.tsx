import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, SubOrDub} from '../../@types';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info} from '../../components';
import {DescriptionComponent} from '../../components/Shared';
import {ScrollView} from '../../styles/sharedStyles';
import {EpisodesModal} from '../../modals';
import {API_BASE} from '@env';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {InfoPageSkeleton} from '../../components/Skeletons';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
  const navigate: any = useNavigation();
  const {id} = route.params;
  const [showEpisodesModal, setShowEpisodesModal] = React.useState(false);
  const [dubOrSub, setDubOrSub] = React.useState<SubOrDub>('sub');

  const fetcher = async () => {
    return await api.fetcher(
      `${API_BASE}/anilist/info/${id}?dub=${dubOrSub === 'dub'}`,
    );
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['info', id, dubOrSub],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (!id) return navigate.navigate('Home');
  }, []);

  if (isPending) return <InfoPageSkeleton />;

  return (
    <SafeAreaView>
      <ScrollView>
        <Info.Top
          title={data.title}
          rating={data.rating}
          poster_image={data.cover}
          key={`info-top-${data.id}`}
          dubOrSub={dubOrSub}
          setDubOrSub={setDubOrSub}
        />
        {/* <Info.ContinueWatching /> */}
        <Info.Options
          openEpisodesModal={() => setShowEpisodesModal(true)}
          episodeLegth={data?.episodes?.length ?? 0}
        />
        <Info.MetaInfo
          title={data.title}
          rating={data.rating}
          genres={data.genres}
          total_episodes={data?.episodes?.length ?? 0}
          release_year={data.releaseDate}
          key={`info-meta-info-${data.id}`}
        />
        <DescriptionComponent description={data.description} />
      </ScrollView>
      <EpisodesModal
        episodes={data.episodes}
        visible={showEpisodesModal}
        setVisible={setShowEpisodesModal}
        anime_info={{
          id: data.id,
          title: data.title,
        }}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
