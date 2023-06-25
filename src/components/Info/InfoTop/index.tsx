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
import {ITitleLanguageOptions} from '../../../@types';
import {utils} from '../../../utils';

interface Props {
  rating: number;
  title: string | ITitleLanguageOptions;
  poster_image: string;
}

const Top = ({rating, title, poster_image}: Props) => {
  const actualTitle = utils.getTitle(title);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        <Wrapper>
          <TopContainer>
            <BackButton onPress={goBack}>
              <BackButtonIcon name="arrow-left" />
            </BackButton>
            <RatingComponent rating={rating} />
          </TopContainer>
          <BottomContainer>
            {/* <SeasonText>Season 1</SeasonText> */}
            <TitleText numberOfLines={1}>{actualTitle}</TitleText>
            <WatchNowComponent WatchText="Watch trailer" />
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default Top;
