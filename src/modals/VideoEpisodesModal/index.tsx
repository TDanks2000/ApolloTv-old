import {View, Text, Modal} from 'react-native';
import React from 'react';
import {EpisodeInfo} from '../../@types';
import {
  Container,
  EpisodesContainer,
  TopContainer,
  TopTitle,
  Wrapper,
} from './VideoEpisodesModal.styles';
import EpisodeCard from '../../components/EpisodeCard';

type Props = {
  episodes: EpisodeInfo[];
  visible: boolean;
  onClose: () => void;
};

const VideoEpisodesModal = () => {
  return (
    <Modal
      visible={false}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}>
      <Container>
        <Wrapper>
          <TopContainer>
            <TopTitle>Episodes</TopTitle>
          </TopContainer>
          <EpisodesContainer></EpisodesContainer>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default VideoEpisodesModal;
