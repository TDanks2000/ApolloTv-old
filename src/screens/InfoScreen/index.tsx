import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QueryAnime, RootStackParamList, SubOrDub} from '../../@types';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info} from '../../components';
import {DescriptionComponent} from '../../components/Shared';
import {ScrollView, SharedContainer} from '../../styles/sharedStyles';
import {EpisodesModal} from '../../modals';
import {API_BASE} from '@env';
import {api, helpers} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {InfoPageSkeleton} from '../../components/Skeletons';
import CharacterContainer from '../../containers/CastContainer';
import {Wrapper} from './InfoScreen.styles';
import {useAccessToken} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);
  const navigate: any = useNavigation();
  const {id} = route.params;
  const [showEpisodesModal, setShowEpisodesModal] = React.useState(false);
  const [dubOrSub, setDubOrSub] = React.useState<SubOrDub>();

  useEffect(() => {
    if (!id) return navigate.navigate('Home');

    setDubOrSub(helpers.getSubOrDub());
  }, []);

  const fetcher = async () => {
    const mediaStatus = (await anilist.media.anime(Number(id))) as any;

    const animeData = await api.fetcher(
      `${API_BASE}/anilist/info/${id}?dub=${dubOrSub === 'dub'}`,
    );

    const mediaListStatus = mediaStatus?.data?.Media?.mediaListEntry;

    const returnData = {
      mediaStatus: mediaListStatus,
      animeData: animeData,
    };

    return returnData;
  };

  const {
    isPending,
    isError,
    data: resData,
    error,
  }: QueryAnime = useQuery({
    queryKey: ['info', id, dubOrSub],
    queryFn: fetcher,
  });

  if (isPending) return <InfoPageSkeleton />;

  const data = resData?.animeData;
  const mediaListStatus = resData?.mediaStatus;

  if (!data) return <InfoPageSkeleton />;

  const findNextEpisode = (episodes: any[]) => {
    const nextEpisodeNumber = mediaListStatus?.progress + 1;

    if (mediaListStatus.status === 'COMPLETED') return undefined;
    if (nextEpisodeNumber >= episodes.length)
      return episodes[episodes.length - 1];

    const find =
      episodes.find((episode: any) => episode.number === nextEpisodeNumber) ||
      episodes[0];

    return find;
  };

  const nextEpisode = findNextEpisode(data.episodes);

  return (
    <SafeAreaView>
      <ScrollView>
        <Info.Top
          title={data.title}
          rating={data.rating}
          poster_image={data.cover}
          key={`info-top-${data.id}`}
          dubOrSub={dubOrSub ?? 'sub'}
          setDubOrSub={setDubOrSub}
        />
        {!nextEpisode ? null : (
          <Info.ContinueWatching
            animeData={data}
            animeId={Number(data.id)}
            currentEpisode={nextEpisode?.number ?? 1}
            currentEpisodeData={nextEpisode ?? {}}
          />
        )}
        <Info.Options
          openEpisodesModal={() => setShowEpisodesModal(true)}
          episodeLegth={data?.episodes?.length ?? 0}
        />
        <Info.MetaInfo
          title={data.title}
          rating={data.rating}
          genres={data.genres}
          total_episodes={data?.episodes?.length.toString() ?? 0}
          release_year={data.releaseDate?.toString() ?? '??'}
          key={`info-meta-info-${data.id}`}
        />
        <DescriptionComponent description={data.description} />
        <Wrapper>
          <CharacterContainer
            characters={data.characters}
            subOrDub={dubOrSub}
          />
        </Wrapper>
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
