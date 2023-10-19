import {FlatList} from 'react-native';
import React from 'react';
import {SharedContainer, Title} from '../../styles/sharedStyles';
import {useQuery} from '@tanstack/react-query';
import {ANNRecentFeed, RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {api} from '../../utils';
import {API_BASE} from '@env';
import {
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
  NewsCard,
} from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'news'>;

const NewsScreen: React.FC<Props> = ({navigation, route}) => {
  const [showModal, setShowModal] = React.useState<boolean>(true);
  const params = route?.params;
  const {topic} = params;

  const fetcher = async () => {
    return await api.fetcher<ANNRecentFeed[]>(
      `${API_BASE}/ann/recent-feeds?topic=${topic}`,
    );
  };

  const {isPending, isError, data, error} = useQuery<ANNRecentFeed[]>({
    queryKey: ['news_feed', topic],
    queryFn: fetcher,
  });

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (!data || isError)
    return <MiddleOfScreenTextComponent text="There was an unexpected error" />;

  const renderItem = ({item}: {item: ANNRecentFeed}) => {
    return (
      <NewsCard
        id={item.id}
        image={item.thumbnail}
        preview={item.preview}
        title={item.title}
        topics={item.topics}
      />
    );
  };

  return (
    <>
      <SharedContainer>
        <Title>
          News {topic ? `- ${topic.split('-').join(' ').toUpperCase()}` : null}
        </Title>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            gap: 15,
          }}
          style={{
            marginTop: 10,
          }}
        />
      </SharedContainer>
    </>
  );
};

export default NewsScreen;
