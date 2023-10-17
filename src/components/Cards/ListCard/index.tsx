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
import EpisodeStats from './EpisodeStats';

type Props = {
  typeOfCard?: 'search' | 'normal';
};

const ListCard: React.FC<CardProps & Props> = ({
  id,
  title,
  color,
  poster_image,
  rating,
  total_episodes,
  type,
  release_year,
  start_date,
  progress,
  list_type,
  nextAiringEpisode,
  selectedList,
  status,
  typeOfCard,
}) => {
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
    <Container onPress={onPress} isMobile={isMobile}>
      <Wrapper>
        <Left>
          <Image source={{uri: poster_image}} />
        </Left>
        <Right>
          <Title>{actualTitle}</Title>

          <EpisodeStats
            progress={progress}
            status={status}
            total_episodes={total_episodes}
            current_episodes={current_episodes}
            start_date={start_date}
            release_year={release_year}
            typeOfCard={typeOfCard}
          />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ListCard;
