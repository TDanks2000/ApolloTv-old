import {View, Text} from 'react-native';
import React from 'react';
import {
  BottomBanner,
  BottomBannerTextContainer,
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
} from '../../@types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const EpisodeCard = ({
  image,
  id,
  title,
  episode_number,
  watched_percentage,
  setEpisodeModalVisible,

  anime_info,
}: EpisodeCardProps) => {
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
    });
    setEpisodeModalVisible(false);
  };

  return (
    <EpisodeContainer onPress={onPress}>
      <EpisodeImageBackground
        source={{
          uri: image,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <BottomBanner>
            {watched_percentage && watched_percentage > 0 ? (
              <PercentWatchedContainer>
                <PercentWatched watchedPercent={watched_percentage ?? 0} />
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
