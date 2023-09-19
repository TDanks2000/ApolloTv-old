import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  Topic,
  TopicText,
  ImageBackground,
  BottomInfo,
  Title,
  Description,
} from './NewsCard.styles';
import {Preview, StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  id: string;
  topics: string[];
  preview: Preview;
  image: string;
};

const NewsCard: React.FC<Props> = ({preview, id, image, title, topics}) => {
  const navigation = useNavigation<StackNavigation>();

  const handlePress = () => {
    navigation.navigate('newsInfo', {
      id,
      image,
    });
  };
  const topic = topics[0];

  const handleTopicPress = () => {
    navigation.navigate('news', {
      topic,
    });
  };

  return (
    <Container onPress={handlePress}>
      <ImageBackground
        source={{
          uri: image,
        }}>
        <Topic onPress={handleTopicPress}>
          <TopicText numberOfLines={1}>{topic.split('-').join(' ')}</TopicText>
        </Topic>
      </ImageBackground>

      <BottomInfo>
        <Title numberOfLines={1}>{title}</Title>
        <Description numberOfLines={3}>
          {preview.intro} - {preview.full}
        </Description>
      </BottomInfo>
    </Container>
  );
};

export default NewsCard;
