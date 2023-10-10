import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {CardProps} from '../../../@types';
import {utils} from '../../../utils';
import {
  BottomBanner,
  BottomBannerSubText,
  BottomBannerText,
  Container,
  Image,
  ImageBackground,
  PercentWatched,
  PercentWatchedContainer,
  WhereAmIFromContainer,
  Wrapper,
} from './ContinueWatchingCard.styles';
import {useNavigation} from '@react-navigation/native';
import {useBreakpoints} from '../../../hooks';

const anilistLogo = require('../../../assets/images/anilist-logo.png');
const apolloLogo = require('../../../assets/images/ApolloTv(no-bg).png');

const ContinueWatchingCard = (
  props: CardProps & {
    watched_percentage: number;
    episode_number: number;
    from: 'anilist' | 'default';
  },
) => {
  const {isMobile} = useBreakpoints();
  const {
    title,
    poster_image,
    rating,
    id,
    watched_percentage,
    episode_number,
    from,
  } = props;
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
          uri:
            poster_image!?.length <= 0
              ? 'https://i.pinimg.com/736x/b4/f2/23/b4f223cb37161662ec539a50507060b3.jpg'
              : poster_image,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <WhereAmIFromContainer>
            <Image source={from === 'anilist' ? anilistLogo : apolloLogo} />
          </WhereAmIFromContainer>
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
