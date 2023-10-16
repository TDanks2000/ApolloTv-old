import React from 'react';
import {
  Container,
  PercentWatched,
  Text,
  TextContainer,
  TextIcon,
  Wrapper,
} from './ContinueWatching.styles';
import {EpisodeInfo, FullAnimeInfo, StackNavigation} from '../../../@types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {episodeSQLHelper} from '../../../utils/database';
import {SettingsContext} from '../../../contexts';

interface Props {
  animeId: number;
  currentEpisode: number;
  currentEpisodeData: any;
  animeData: FullAnimeInfo;
  nextEpisodeData: any;
  nextEpisodeNumber: number;
  episodes: EpisodeInfo[];
}

const ContinueWatching = ({
  animeId,
  currentEpisode,
  currentEpisodeData,
  nextEpisodeData,
  nextEpisodeNumber,
  animeData,
  episodes,
}: Props) => {
  const [watchedPercentage, setWatchedPercentage] = React.useState<number>(0);
  const navigation = useNavigation<StackNavigation>();

  const {sourceProvider} = React.useContext(SettingsContext);

  const onPress = () => {
    navigation.navigate('VideoPlayer', {
      source_provider: sourceProvider ? sourceProvider : 'gogoanime',
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
        malId: animeData.malId,
      },
      next_episode_id: nextEpisodeData.id,
      watched_percentage: watchedPercentage,
      episodes,
    });
  };

  const getContuineWatchingAmount = async () => {
    const data: any = await episodeSQLHelper.selectFromAnimeId(animeData.id);
    const findEpisode = data.find(
      (item: any) => item.episode_number === currentEpisode,
    );

    return setWatchedPercentage(findEpisode?.watched_percentage ?? 0);
  };

  useFocusEffect(
    React.useCallback(() => {
      getContuineWatchingAmount();
    }, [animeId, currentEpisode]),
  );

  return (
    <Container>
      <Wrapper onPress={onPress}>
        <PercentWatched
          watched_amount={
            currentEpisode <= 1
              ? 100
              : watchedPercentage
              ? Math.floor(watchedPercentage)
              : 100
          }
        />
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
