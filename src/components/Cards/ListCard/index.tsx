import {View, Text} from 'react-native';
import React from 'react';
import {CardProps, StackNavigation} from '../../../@types';
import {utils} from '../../../utils';
import {
  Container,
  ExtraText,
  ExtraTextContailer,
  Image,
  Left,
  Right,
  Seperator,
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
  progress,
  list_type,
  nextAiringEpisode,
  selectedList,
}: CardProps) => {
  const {isMobile} = useBreakpoints();
  const navigation = useNavigation<StackNavigation>();
  const actualTitle = utils.getTitle(title);

  const current_episodes = nextAiringEpisode
    ? nextAiringEpisode.episode - 1
    : total_episodes
    ? total_episodes
    : undefined;

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
          <ExtraText>{release_year ? release_year : '??'}</ExtraText>
          {/* {selectedList !== 'CURRENT' ? (
            <ExtraText>Total Episodes {total_episodes}</ExtraText>
          ) : ( */}
          <ExtraTextContailer>
            <ExtraText bold={true} color={'main'}>
              {progress ?? 0}
            </ExtraText>
            <Seperator />
            {current_episodes === total_episodes ? (
              <ExtraText>{current_episodes}</ExtraText>
            ) : (
              <>
                <ExtraText>{current_episodes}</ExtraText>
                <Seperator />
                <ExtraText>{total_episodes ?? 0}</ExtraText>
              </>
            )}
          </ExtraTextContailer>
          {/* )} */}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ListCard;
