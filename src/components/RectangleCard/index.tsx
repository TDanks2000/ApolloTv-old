import {View, Text} from 'react-native';
import React from 'react';
import {CardProps} from '../../@types';
import {utils} from '../../utils';
import {
  Container,
  ImageBackground,
  RatingContainer,
  RatingIcon,
  RatingText,
  RatingWrapper,
  Title,
  Wrapper,
} from './RectangleCard.styles';
import {useNavigation} from '@react-navigation/native';

const RectangleCard = ({title, id, poster_image, rating}: CardProps) => {
  const navigation: any = useNavigation();
  const actualTitle = utils.getTitle(title);

  const onPress = () => {
    navigation.navigate('Info', {id});
  };

  return (
    <Container onPress={onPress}>
      <ImageBackground source={{uri: poster_image}}>
        <Wrapper>
          <RatingContainer>
            <RatingWrapper>
              <RatingText>
                {rating ? (rating / 10).toFixed(1) : '??'}
              </RatingText>
              <RatingIcon name="star" />
            </RatingWrapper>
          </RatingContainer>
          <Title>{actualTitle}</Title>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default RectangleCard;
