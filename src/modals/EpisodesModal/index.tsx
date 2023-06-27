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
  const [selectedPage, setSelectedPage] = React.useState<number>(1);

  const pageSize = 50;

  const animeTitle = utils.getTitle(anime_info.title);
  const goBack = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    if (!episodes || !episodes?.length) return;

    if (episodes[0].number !== 1) episodes.sort((a, b) => a.number - b.number);
  }, [episodes]);

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
                .map((episode, index) => (
                  <EpisodeCard
                    key={`episode-${index}`}
                    id={episode.id}
                    title={episode.title}
                    image={episode.image}
                    episode_number={episode.number}
                    setEpisodeModalVisible={setVisible}
                    anime_info={{
                      id: anime_info.id,
                      title: anime_info.title,
                    }}
                  />
                ))}
            </EpisodesWrapper>
          </Container>
        </ScrollView>
      </ModalContainer>
    </Modal>
  );
};

export default EpisodesModal;
