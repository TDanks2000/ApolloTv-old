import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {MediaSeasons} from '../../../utils/constants';
import {MediaSeason} from '../../../@types';
import {PillComponent} from '../../Shared';

const Season = () => {
  const renderItem = (item: MediaSeason) => {
    return <PillComponent title={item.replaceAll('_', ' ')} active={false} />;
  };

  return (
    <View>
      <FlatList
        data={MediaSeasons}
        renderItem={({item}) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `filter-season-${item}`}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default Season;
