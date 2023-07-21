import {View, Text} from 'react-native';
import React from 'react';
import {api} from '../../../utils';
import {API_BASE} from '@env';
import {EpisodeInfo} from '../../../@types';

type Props = {
  episode_info: EpisodeInfo;
};

const VideoEpisodeCard = ({episode_info}: Props) => {
  const handlePress = async () => {
    const data = await api.fetcher(
      `${API_BASE}/anilist/watch/${episode_info.id}`,
    );

    // Set src of video and close modal
  };

  return (
    <View>
      <Text>VideoEpisodeCard</Text>
    </View>
  );
};

export default VideoEpisodeCard;
