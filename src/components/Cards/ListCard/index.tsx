import {View, Text} from 'react-native';
import React from 'react';
import {CardProps, StackNavigation} from '../../../@types';
import {utils} from '../../../utils';
import {
  Container,
  ExtraText,
  Image,
  Left,
  Right,
  Title,
  Wrapper,
} from './ListCard.styles';
import {useNavigation} from '@react-navigation/native';
import {useBreakpoints} from '../../../hooks';

const ListCard = ({
  id,
  title,
  color,
  poster_image,
  rating,
  total_episodes,
  type,
  release_year,
}: CardProps) => {
  const {isMobile} = useBreakpoints();
  const navigation = useNavigation<StackNavigation>();
  const actualTitle = utils.getTitle(title);

  const onPress = () => {
    navigation.navigate('Info', {
      id,
    });
  };

  return (
    // @ts-ignore
    <Container onPress={onPress} isMobile={isMobile}>
      <Wrapper>
        <Left>
          <Image source={{uri: poster_image}} />
        </Left>
        <Right>
          <Title>{actualTitle}</Title>
          <ExtraText>
            {total_episodes ? `Episodes ${total_episodes}` : `??`}
          </ExtraText>
          <ExtraText>{release_year ? release_year : '??'}</ExtraText>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ListCard;
