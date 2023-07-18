import {Modal, ScrollView} from 'react-native';
import React from 'react';
import {ModalContainer} from '../../styles/sharedStyles';
import {
  BackButton,
  BackButtonIcon,
  Container,
  EpisodesWrapper,
  Title,
  TopContainer,
} from './EpisodesModal.styles';

import EpisodeCard from '../../components/EpisodeCard';
import {AnimeInfo} from '../../@types';
import {utils} from '../../utils';
import {Paginate} from '../../components';
import {episodeSQLHelper} from '../../utils/database';
import {useAccessToken} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useQuery} from '@tanstack/react-query';

interface Props {
  episodes: any[];
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
    if (!episodes || !episodes?.length) return;

    if (episodes[0].number !== 1) episodes.sort((a, b) => a.number - b.number);
  }, [episodes]);

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
            <EpisodesWrapper>
              <Paginate
                results={episodes}
                pageSize={pageSize}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              {episodes
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
                      episode_number={episode.number}
                      setEpisodeModalVisible={setVisible}
                      episodeDBEntry={episodeFromDb}
                      watched_percentage={episode.number <= progress ? 100 : 0}
                      anime_info={{
                        id: anime_info.id,
                        title: anime_info.title,
                        malId: anime_info.malId,
                      }}
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
