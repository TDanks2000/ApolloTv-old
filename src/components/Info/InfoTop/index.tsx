import {View, Text} from 'react-native';
import React from 'react';
import {
  BackButton,
  BackButtonIcon,
  BottomContainer,
  Container,
  ImageBackground,
  SeasonText,
  TitleText,
  TopContainer,
  Wrapper,
} from './InfoTop.styles';
import {RatingComponent, WatchNowComponent} from '../../Shared';
import {useNavigation} from '@react-navigation/native';

const Top = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ImageBackground
        source={{
          uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/128547-aVWJmZz9dwJJ.jpg',
        }}>
        <Wrapper>
          <TopContainer>
            <BackButton onPress={goBack}>
              <BackButtonIcon name="arrow-left" />
            </BackButton>
            <RatingComponent rating={81} />
          </TopContainer>
          <BottomContainer>
            {/* <SeasonText>Season 1</SeasonText> */}
            <TitleText numberOfLines={1}>Odd Taxi</TitleText>
            <WatchNowComponent WatchText="Watch trailer" />
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default Top;
