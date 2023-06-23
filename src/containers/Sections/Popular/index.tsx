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

const PopularContainer = () => {
  const {results: data} = AnimeTrending;

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
        />
      </SectionWrapper>
    </SectionContainer>
  );
};

export default PopularContainer;
