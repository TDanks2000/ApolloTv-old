import {View} from 'react-native';
import React from 'react';
import {Container, PillContainer, PillTitle} from './RecentSearches.styles';

const data = ['Attack on titan', 'full metal al', 'bluelock', 'bluelock'];

const RecentSearches = () => {
  const renderItem = (item: any) => (
    <PillContainer>
      <PillTitle>{item.item}</PillTitle>
    </PillContainer>
  );

  return (
    <Container
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
      ItemSeparatorComponent={() => <View style={{width: 5}} />}
    />
  );
};

export default RecentSearches;
