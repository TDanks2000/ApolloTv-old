import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {
  Container,
  RatingContainer,
  Title,
  TopContainer,
  WatchNowButton,
  WatchNowContainer,
  Wrapper,
} from './BannerCard.styles';
import {useBreakpoints} from '../../../../hooks';

const BannerCardSkeleton = () => {
  const {isMobile} = useBreakpoints();

  const {width} = useWindowDimensions();
  const screenSize = width * (isMobile ? 0.84 : 0.35);

  return (
    <Container isMobile={isMobile} width={screenSize}>
      <Wrapper>
        <TopContainer>
          <Title />
          <RatingContainer />
        </TopContainer>
        <WatchNowContainer>
          <WatchNowButton />
        </WatchNowContainer>
      </Wrapper>
    </Container>
  );
};

export default BannerCardSkeleton;
