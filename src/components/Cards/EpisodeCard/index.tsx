import {View, Text} from 'react-native';
import React from 'react';
import {
  BottomBanner,
  BottomBannerTextContainer,
  DownloadButton,
  DownloadIcon,
  DownloadWrapper,
  EpisodeContainer,
  EpisodeImageBackground,
  EpisodeNumber,
  EpisodeTitle,
  PercentWatched,
  PercentWatchedContainer,
  Wrapper,
} from './EpisodeCard.styles';
import {
  EpisodeCardProps,
  EpisodeInfo,
  RootStackParamList,
  StackNavigation,
} from '../../../@types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CircleProgress} from '../../Shared';

const EpisodeCard = (props: EpisodeCardProps) => {
  let {
    anime_info,
    episodeDBEntry,
    id,
    setEpisodeModalVisible,
    title,
    episode_number,
    image,
    watched_percentage,
    episodes,
  } = props;
  const [actualWatchedPercent, setActualWatchedPercent] = React.useState<
    number | undefined
  >(watched_percentage);

  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {
    navigation.navigate('VideoPlayer', {
      episode_id: id,
      source_provider: 'gogoanime',
      episode_info: {
        title: title ?? `Episode ${episode_number ?? 1}`,
        id,
        episode_number: episode_number,
        image: image,
      },
      anime_info: {
        id: anime_info.id,
        title: anime_info.title,
        malId: anime_info.malId,
      },
      episodes,
    });
    setEpisodeModalVisible(false);
  };

  React.useEffect(() => {
    if (
      episodeDBEntry?.watched_percentage &&
      watched_percentage &&
      watched_percentage <= 0
    )
      setActualWatchedPercent(episodeDBEntry?.watched_percentage ?? 0);
    else if (watched_percentage && watched_percentage > 0)
      setActualWatchedPercent(watched_percentage);
    else setActualWatchedPercent(undefined);
  }, []);

  const imageAlts = image ? image : anime_info.image;

  return (
    <EpisodeContainer onPress={onPress}>
      <EpisodeImageBackground
        source={{
          uri: imageAlts,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <BottomBanner>
            {actualWatchedPercent && actualWatchedPercent > 0 ? (
              <PercentWatchedContainer>
                <PercentWatched
                  watchedPercent={
                    actualWatchedPercent
                      ? actualWatchedPercent
                      : Boolean(episodeDBEntry?.watched) === true
                      ? 100
                      : 0
                  }
                />
              </PercentWatchedContainer>
            ) : null}
            <BottomBannerTextContainer>
              <EpisodeNumber
                numberOfLines={1}>{`Episode ${episode_number}`}</EpisodeNumber>
              <EpisodeTitle numberOfLines={1}>
                {title ?? `Episode ${episode_number}`}
              </EpisodeTitle>
            </BottomBannerTextContainer>
          </BottomBanner>
        </Wrapper>
      </EpisodeImageBackground>
    </EpisodeContainer>
  );
};

export default EpisodeCard;
