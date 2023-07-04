import React from 'react';
import {
  Container,
  PercentWatched,
  Text,
  TextContainer,
  TextIcon,
  Wrapper,
} from './ContinueWatching.styles';
import {StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';

interface Props {
  animeId: number;
  currentEpisode: number;
  currentEpisodeData: any;
  animeData: any;
}

const ContinueWatching = ({
  animeId,
  currentEpisode,
  currentEpisodeData,
  animeData,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {
    navigation.navigate('VideoPlayer', {
      source_provider: 'gogoanime',
      episode_id: currentEpisodeData.id,
      episode_info: {
        id: currentEpisodeData.id,
        title: currentEpisodeData.title,
        episode_number: currentEpisodeData.number,
        image: currentEpisodeData.image,
      },
      anime_info: {
        id: animeId.toString(),
        title: animeData.title,
      },
    });
  };

  return (
    <Container>
      <Wrapper onPress={onPress}>
        <PercentWatched watched_amount={currentEpisode <= 1 ? 100 : 100} />
        <TextContainer>
          <TextIcon name="play-circle-o" />
          <Text>
            {currentEpisode <= 1
              ? 'start watching'
              : `resume episode ${currentEpisode}`}
          </Text>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default ContinueWatching;
