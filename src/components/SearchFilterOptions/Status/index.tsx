import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {MediaStatuss} from '../../../utils/constants';
import {MediaStatus} from '../../../@types';
import {PillComponent} from '../../Shared';

const Status = () => {
  const renderItem = (item: MediaStatus) => {
    return <PillComponent title={item.replaceAll('_', ' ')} active={false} />;
  };

  return (
    <View>
      <FlatList
        data={MediaStatuss}
        renderItem={({item}) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `filter-status-${item}`}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default Status;
