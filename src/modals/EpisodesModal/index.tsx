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

interface Props {
  episodes: any[];
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const EpisodesModal = ({setVisible, visible = false, episodes}: Props) => {
  const goBack = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    if (!episodes) return;

    if (episodes[0].number !== 1) episodes.sort((a, b) => b.number - a.number);
  }, []);

  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <ModalContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <TopContainer>
              <BackButton onPress={goBack}>
                <BackButtonIcon name="arrow-left" />
              </BackButton>
              <Title numberOfLines={1}>Odd Taxi</Title>
            </TopContainer>
            <EpisodesWrapper>
              {episodes.map((episode, index) => (
                <EpisodeCard
                  key={`episode-${index}`}
                  id={episode.id}
                  title={episode.title}
                  image={episode.image}
                  episode_number={episode.number}
                  watched_percentage={Math.floor(Math.random() * 100)}
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
