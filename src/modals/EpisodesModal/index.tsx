import React from 'react';
import {Modal, ScrollView} from 'react-native';
import {ModalContainer} from '../../styles/sharedStyles';
import {
  BackButton,
  BackButtonIcon,
  Container,
  EpisodesWrapper,
  Options,
  Title,
  TopContainer,
} from './EpisodesModal.styles';

import {useQuery} from '@tanstack/react-query';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {AnimeInfo, EpisodeInfo} from '../../@types';
import {Paginate} from '../../components';
import {EpisodeCard} from '../../components/Cards';
import {useAccessToken} from '../../contexts';
import {utils} from '../../utils';
import {episodeSQLHelper} from '../../utils/database';
import ShowDownloads from './ShowDownloads';

interface Props {
  episodes: EpisodeInfo[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  anime_info: AnimeInfo;
}

const EpisodesModal = ({
  setVisible,
  visible = false,
  episodes,
  anime_info,
}: Props) => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const [selectedPage, setSelectedPage] = React.useState<number>(1);
  const [episodeState, setEpisodes] = React.useState<EpisodeInfo[]>(episodes);

  const pageSize = 50;

  const animeTitle = utils.getTitle(anime_info.title);
  const goBack = () => {
    setVisible(false);
  };

  const getEpisodesFromSQLDB = async () => {
    const anilistData = await anilist.media.anime(parseInt(anime_info.id));
    const dataFromDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );

    return {data: dataFromDb, anilistData};
  };

  const {
    isError,
    isPending,
    data: dataFromDBAndAnilist,
    error,
  } = useQuery({
    queryKey: ['getEpisodesFromSQLDB', anime_info.id],
    queryFn: getEpisodesFromSQLDB,
  });

  React.useEffect(() => {
    if (!episodeState || !episodeState?.length) return;

    if (episodeState[0].number !== 1)
      episodeState.sort((a, b) => a.number - b.number);
  }, [episodeState]);

  if (isPending) return null;

  const progress =
    (dataFromDBAndAnilist?.anilistData as any)?.data.Media?.mediaListEntry
      ?.progress ?? 0;

  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <ModalContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <TopContainer>
              <BackButton onPress={goBack}>
                <BackButtonIcon name="arrow-left" />
              </BackButton>
              <Title numberOfLines={1}>{animeTitle}</Title>
            </TopContainer>
            <Options>
              <ShowDownloads
                anime_info={anime_info}
                episodes={episodeState}
                old_episodes={episodes}
                setEpisodes={setEpisodes}
              />
            </Options>
            <EpisodesWrapper>
              <Paginate
                results={episodeState}
                pageSize={pageSize}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              {episodeState
                .slice(
                  selectedPage === 1 ? 0 : (selectedPage - 1) * pageSize,
                  selectedPage === 1 ? pageSize : pageSize * selectedPage + 1,
                )
                .map((episode, index) => {
                  const episodeFromDb = dataFromDBAndAnilist?.data.find(
                    (item: any) => item.episode_number === episode.number,
                  );

                  // console.log({
                  //   episodeNumber: episode.number,
                  //   progres: progress,
                  //   watched: episode.number <= progress,
                  // });

                  return (
                    <EpisodeCard
                      key={`episode-${index}`}
                      id={episode.id}
                      title={episode.title}
                      image={episode.image}
                      isFiller={episode?.isFiller}
                      episode_number={episode.number}
                      setEpisodeModalVisible={setVisible}
                      episodeDBEntry={episodeFromDb}
                      watched_percentage={
                        episode.number <= progress
                          ? 100
                          : episodeFromDb
                          ? episodeFromDb?.watched_percentage
                          : 0
                      }
                      anime_info={{
                        id: anime_info.id,
                        title: anime_info.title,
                        malId: anime_info.malId,
                        image: anime_info.image,
                      }}
                      episodes={episodes}
                    />
                  );
                })}
            </EpisodesWrapper>
          </Container>
        </ScrollView>
      </ModalContainer>
    </Modal>
  );
};

export default EpisodesModal;
