import {View, FlatList} from 'react-native';
import React from 'react';
import ListCard from '../../ListCard';

const SearchResults = ({data}: any) => {
  const renderItem = (item: any) => (
    <ListCard
      id={item.id}
      title={item.title}
      color={item.color}
      poster_image={item.image}
      rating={item.rating}
      total_episodes={item.totalEpisodes}
      type={item.type}
      release_year={item.releaseDate}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={({item}) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{height: 25}} />}
      contentContainerStyle={{paddingBottom: 300, paddingTop: 20}}
    />
  );
};

export default SearchResults;
