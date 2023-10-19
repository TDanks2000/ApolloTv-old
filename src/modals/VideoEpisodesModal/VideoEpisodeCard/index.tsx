import {AnimeInfo, EpisodeInfo, StackNavigation} from '../../../@types';
import {
  Container,
  ExtraText,
  Image,
  Left,
  Right,
  Title,
} from './VideoEpisodeCard.styles';
import {useNavigation} from '@react-navigation/native';

type Props = {
  episode_info: EpisodeInfo;
  isCurrentEpisode: boolean;
  anime_info: AnimeInfo;
  episodes: EpisodeInfo[];

  closeFunction: () => void;
};

const VideoEpisodeCard = ({
  episode_info,
  isCurrentEpisode,
  anime_info,
  episodes,
  closeFunction,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();

  const handlePress = async () => {
    navigation.navigate('VideoPlayer', {
      anime_info: anime_info,
      episode_id: episode_info.id,
      episode_info,
      episodes: episodes,
      source_provider: 'gogoanime',
      next_episode_id: episodes[episodes.indexOf(episode_info) + 1]?.id,
    });
    closeFunction();
  };

  return (
    <Container isCurrentEpisode={isCurrentEpisode} onPress={handlePress}>
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
