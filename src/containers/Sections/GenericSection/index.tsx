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
import {api} from '../../../utils';
import {useQuery} from '@tanstack/react-query';
import {SectionTypes} from '../../../@types';

interface Props {
  sectionTitle: string;
  sectionType: SectionTypes;
}

const GenericSection = ({sectionTitle, sectionType}: Props) => {
  const fetcher = async () => {
    return await api.fetcher(api.getSectionUrl(sectionType));
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['section', sectionType],
    queryFn: fetcher,
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
        <SectionTitle>{sectionTitle}</SectionTitle>
      </SectionTitleContainer>
      <SectionWrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.results}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={renderItem}
          contentContainerStyle={{paddingRight: 20}}
        />
      </SectionWrapper>
    </SectionContainer>
  );
};

export default GenericSection;
