import {View, Text} from 'react-native';
import React from 'react';
import {api} from '../../../utils';
import {API_BASE} from '@env';
import {EpisodeInfo} from '../../../@types';
import {
  Container,
  ExtraText,
  Image,
  Left,
  Right,
  Title,
} from './VideoEpisodeCard.styles';

type Props = {
  episode_info: EpisodeInfo;
  isCurrentEpisode: boolean;
};

const VideoEpisodeCard = ({episode_info, isCurrentEpisode}: Props) => {
  const handlePress = async () => {
    const data = await api.fetcher(
      `${API_BASE}/anilist/watch/${episode_info.id}`,
    );

    // Set src of video and close modal
  };

  return (
    <Container isCurrentEpisode={isCurrentEpisode}>
      <Left>
        <Image source={{uri: episode_info.image}} />
      </Left>
      <Right>
        <Title isCurrentEpisode={isCurrentEpisode}>
          {episode_info.title ?? `Episode ${episode_info.episode_number}`}
        </Title>
        <ExtraText>Episode {episode_info.episode_number}</ExtraText>
      </Right>
    </Container>
  );
};

export default VideoEpisodeCard;
