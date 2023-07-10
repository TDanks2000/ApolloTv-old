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
import {useNavigation} from '@react-navigation/native';

const ContinueWatchingCard = ({title, poster_image, rating, id}: CardProps) => {
  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  const screenSize = width * 0.84;

  const actualTitle = utils.getTitle(title, 'english');

  const onPress = () => {
    navigation.navigate('Info', {id});
  };

  return (
    <Container width={width} onPress={onPress}>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        {/* @ts-ignore */}
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
