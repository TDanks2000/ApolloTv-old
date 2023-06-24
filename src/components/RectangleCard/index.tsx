import {View, Text} from 'react-native';
import React from 'react';
import {CardProps} from '../../@types';
import {utils} from '../../utils';
import {
  Container,
  ImageBackground,
  RatingWrapper,
  Title,
  Wrapper,
} from './RectangleCard.styles';
import {useNavigation} from '@react-navigation/native';
import {RatingComponent} from '../Shared';

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
          <RatingWrapper>
            <RatingComponent rating={rating} />
          </RatingWrapper>
          <Title>{actualTitle}</Title>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default RectangleCard;
