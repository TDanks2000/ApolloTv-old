import {ScrollView} from 'react-native';
import React from 'react';
import {api, utils} from '../../utils';
import {API_BASE} from '@env';
import {useQuery} from '@tanstack/react-query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ANNInfo, RootStackParamList} from '../../@types';
import {
  BackButtonComponent,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
} from '../../components';
import {SharedContainer} from '../../styles/sharedStyles';
import {
  Container,
  TopContainer,
  Image,
  Info,
  Title,
  DateText,
  Description,
  MetaInfo,
} from './NewInfoScreen.styles';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, 'newsInfo'>;

const NewsInfoScreen: React.FC<Props> = ({navigation, route}) => {
  const params = route?.params;
  const {id, image} = params;

  const fetcher = async () => {
    return await api.fetcher<ANNInfo>(`${API_BASE}/ann/info?id=${id}`);
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['news_feed', id],
    queryFn: fetcher,
  });

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (!data || isError)
    return <MiddleOfScreenTextComponent text="There was an unexpected error" />;

  const uploadedAt = data.uploadedAt.split(' ')[0];
  const date = dayjs(uploadedAt).format('MMMM D, YYYY');

  const isThereAnImage = data.thumbnail.includes('imgur');

  return (
    <SharedContainer>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 85,
        }}
        showsVerticalScrollIndicator={false}>
        <Container>
          <TopContainer>
            <Info>
              <BackButtonComponent isModal={false} key={'go_back_news_info'} />
              <MetaInfo>
                <Title numberOfLines={3}>{data.title}</Title>
                <DateText numberOfLines={1}>{date}</DateText>
              </MetaInfo>
            </Info>
            <Image
              source={{
                uri: isThereAnImage ? image : data.thumbnail,
              }}
            />
          </TopContainer>

          <Description>{utils.textSanitizer(data.description)}</Description>
        </Container>
      </ScrollView>
    </SharedContainer>
  );
};

export default NewsInfoScreen;
