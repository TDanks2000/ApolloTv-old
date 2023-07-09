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
import { useBreakpoints } from '../../../hooks';

const BannerCard = ({poster_image, rating, title, id}: CardProps) => {
  const {isMobile} = useBreakpoints();
  const actualTitle = utils.getTitle(title);
  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  const screenSize = width * (isMobile ? 0.84 : 0.45);

  const onPress = () => {
    navigation.navigate('Info', {id});
  };

  return (
    <Container isMobile={isMobile} width={screenSize} onPress={onPress}>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <TopContainer>
            <Title numberOfLines={2}>{actualTitle}</Title>

            <RatingComponent rating={rating} />
          </TopContainer>
          <WatchNowContainer>
            <WatchNowComponent onPress={onPress} />
          </WatchNowContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default BannerCard;
