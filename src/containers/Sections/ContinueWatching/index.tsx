import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  SectionTitleIcon,
} from '../Sections.shared.styles';
import {Wrapper} from './ContinueWatching.styles';
import {ContinueWatchingCard} from '../../../components';
import {AnimeTrending} from '../../../utils/TestData';

const ContuineWatchingContainer = () => {
  const {results: data} = AnimeTrending;
  const renderItem = ({item}: any) => {
    return (
      <ContinueWatchingCard
        key={item.id}
        title={item.title}
        poster_image={item.image}
        id={item.id}
      />
    );
  };

  return (
    <SectionContainer>
      <SectionTitleContainer>
        <SectionTitle>Contuine Watching</SectionTitle>
      </SectionTitleContainer>
      <Wrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={renderItem}
        />
      </Wrapper>
    </SectionContainer>
  );
};

export default ContuineWatchingContainer;
