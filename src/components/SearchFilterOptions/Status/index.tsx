import {View, FlatList} from 'react-native';
import React from 'react';
import {MediaStatuss} from '../../../utils/constants';
import {MediaStatus} from '../../../@types';
import {PillComponent} from '../../Shared';

type Props = {
  status?: string;
  setStatus: (value: string) => void;
};

const Status: React.FC<Props> = ({status, setStatus}) => {
  const handlePress = (item: MediaStatus) => {
    setStatus(item === status ? '' : item);
  };

  const renderItem = (item: MediaStatus) => {
    return (
      <PillComponent
        title={item.replaceAll('_', ' ')}
        active={status?.toLowerCase() === item.toLowerCase()}
        onPress={() => handlePress(item)}
      />
    );
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
