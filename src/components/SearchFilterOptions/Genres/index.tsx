import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Genres as GenresArray} from '../../../utils/constants';
import {GENRES} from '../../../@types';
import {PillComponent} from '../../Shared';

const Genres = () => {
  const renderItem = (item: GENRES) => {
    return <PillComponent title={item} active={false} />;
  };

  return (
    <View>
      <FlatList
        data={GenresArray}
        renderItem={({item}) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `filter-genre-${item}`}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default Genres;
