import {View, FlatList} from 'react-native';
import React from 'react';
import {
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  SectionWrapper,
} from '../Sections.shared.styles';
import {AnimeTrending} from '../../../utils/TestData';
import {RectangleCard} from '../../../components';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../../utils';

const PopularContainer = () => {
  const getPopularAnime = async () => {
    return await api.fetcher(api.getSectionUrl('popular'));
  };

  const {isPending, isError, data, error} = useQuery({
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
