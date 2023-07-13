import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {CardProps} from '../../@types';
import {utils} from '../../utils';
import {
  BottomBanner,
  BottomBannerSubText,
  BottomBannerText,
  Container,
  ImageBackground,
  PercentWatched,
  PercentWatchedContainer,
  Wrapper,
} from './ContinueWatchingCard.styles';
import {useNavigation} from '@react-navigation/native';
import {useBreakpoints} from '../../hooks';

const ContinueWatchingCard = (
  props: CardProps & {watched_percentage: number; episode_number: number},
) => {
  const {isMobile} = useBreakpoints();
  const {title, poster_image, rating, id, watched_percentage, episode_number} =
    props;
  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  const screenSize = isMobile ? width : width * 0.25;

  const actualTitle = utils.getTitle(title, 'english');

  const onPress = () => {
    navigation.navigate('Info', {id});
  };

  return (
    <Container width={screenSize} onPress={onPress}>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <BottomBanner>
            {watched_percentage === 0 ? null : (
              <PercentWatchedContainer>
                <PercentWatched watched_percentage={watched_percentage ?? 0} />
              </PercentWatchedContainer>
            )}
            <BottomBannerText>{actualTitle}</BottomBannerText>
            <BottomBannerSubText>Episode {episode_number}</BottomBannerSubText>
          </BottomBanner>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default ContinueWatchingCard;
