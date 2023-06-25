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
import {EpisodeCardProps} from '../../@types';

const EpisodeCard = ({
  image,
  id,
  title,
  episode_number,
  watched_percentage,
}: EpisodeCardProps) => {
  return (
    <EpisodeContainer>
      <EpisodeImageBackground
        source={{
          uri: image,
        }}>
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
