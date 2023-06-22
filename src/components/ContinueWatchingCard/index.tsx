import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {CardProps} from '../../@types';
import {utils} from '../../utils';
import {
  BottomBanner,
  BottomBannerText,
  Container,
  ImageBackground,
  PercentWatched,
  PercentWatchedContainer,
  Wrapper,
} from './ContinueWatchingCard.styles';

const ContinueWatchingCard = ({title, poster_image, rating}: CardProps) => {
  const {width} = useWindowDimensions();
  const screenSize = width * 0.84;

  const actualTitle = utils.getTitle(title, 'english');
  return (
    <Container width={width}>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        <Wrapper>
          <BottomBanner>
            <PercentWatchedContainer>
              <PercentWatched />
            </PercentWatchedContainer>
            <BottomBannerText>{actualTitle}</BottomBannerText>
          </BottomBanner>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default ContinueWatchingCard;
