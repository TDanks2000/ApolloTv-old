import {View, Text, Modal, TouchableOpacity} from 'react-native';
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
import VideoEpisodeCard from './VideoEpisodeCard';
import {FlatList} from 'react-native';
import {Paginate} from '../../components';

type Props = {
  episodes: EpisodeInfo[];
  visible: boolean;
  onClose: () => void;
  closeFunction: () => void;
  currentEpisode: number;
};

const VideoEpisodesModal = ({
  episodes,
  visible,
  closeFunction,
  currentEpisode,
}: Props) => {
  const [selectedPage, setSelectedPage] = React.useState<number>(1);

  const pageSize = 50;

  const renderItem = (item: EpisodeInfo) => {
    return (
      <VideoEpisodeCard
        episode_info={{...item, episode_number: item.number}}
        isCurrentEpisode={item.number === currentEpisode}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={closeFunction}>
      <TouchableOpacity onPress={closeFunction}>
        <Container>
          <Wrapper>
            <TopContainer>
              <TopTitle>Episodes</TopTitle>
            </TopContainer>
            <EpisodesContainer>
              <Paginate
                results={episodes}
                pageSize={pageSize}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                size="sm"
              />

              <FlatList
                showsVerticalScrollIndicator={false}
                data={episodes.slice(
                  selectedPage === 1 ? 0 : (selectedPage - 1) * pageSize,
                  selectedPage === 1 ? pageSize : pageSize * selectedPage + 1,
                )}
                renderItem={({item}: {item: EpisodeInfo}) => renderItem(item)}
                contentContainerStyle={{
                  paddingBottom: 100,
                  gap: 20,
                  paddingTop: 10,
                }}
              />
            </EpisodesContainer>
          </Wrapper>
        </Container>
      </TouchableOpacity>
    </Modal>
  );
};

export default VideoEpisodesModal;
