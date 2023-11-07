import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, View} from 'react-native';
import {RectangleCard} from '../../../components';
import {api} from '../../../utils';
import {
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  SectionWrapper,
} from '../Sections.shared.styles';

const PopularContainer = () => {
  const getPopularAnime = async () => {
    return await api.getSection('popular');
  };

  const {isPending, isError, data, error} = useQuery<any>({
    queryKey: ['popularAnime'],
    queryFn: getPopularAnime,
  });

  const renderItem = ({item}: any) => {
    return (
      <RectangleCard
        key={item.id}
        title={item.title}
        poster_image={item.image}
        id={item.id}
        rating={item.rating}
      />
    );
  };

  if (isPending || isError) return null;

  return (
    <SectionContainer>
      <SectionTitleContainer>
        <SectionTitle>Popular</SectionTitle>
      </SectionTitleContainer>
      <SectionWrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={renderItem}
          contentContainerStyle={{paddingRight: 20}}
        />
      </SectionWrapper>
    </SectionContainer>
  );
};

export default PopularContainer;
