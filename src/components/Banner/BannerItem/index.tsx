import {useWindowDimensions, Text} from 'react-native';
import React from 'react';
import {
  Container,
  ImageBackground,
  Title,
  TopContainer,
  WatchNowContainer,
  Wrapper,
} from './BannerCard.styles';
import {useNavigation} from '@react-navigation/native';
import {CardProps} from '../../../@types';
import {utils} from '../../../utils';
import {RatingComponent, WatchNowComponent} from '../../Shared';

const BannerCard = ({poster_image, rating, title, id}: CardProps) => {
  const actualTitle = utils.getTitle(title);
  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  const screenSize = width * 0.84;

  const onPress = () => {
    navigation.navigate('Info', {id});
  };

  return (
    <Container width={screenSize} onPress={onPress}>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        <Wrapper>
          <TopContainer>
            <Title numberOfLines={2}>{actualTitle}</Title>

            <RatingComponent rating={rating} />
          </TopContainer>
          <WatchNowContainer>
            <WatchNowComponent />
          </WatchNowContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default BannerCard;
