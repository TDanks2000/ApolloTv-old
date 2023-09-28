import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {MediaFormats} from '../../../utils/constants';
import {MediaFormat} from '../../../@types';
import {PillComponent} from '../../Shared';

type Props = {
  format?: string;
  setFormat: (value: string) => void;
};

const Format: React.FC<Props> = ({format, setFormat}) => {
  const handlePress = (item: MediaFormat) => {
    setFormat(item === format ? '' : item);
  };

  const renderItem = (item: MediaFormat) => {
    return (
      <PillComponent
        title={item.replaceAll('_', ' ')}
        active={item.toLowerCase() === format?.toLowerCase()}
        onPress={() => handlePress(item)}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={MediaFormats}
        renderItem={({item}) => renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `filter-format-${item}`}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default Format;
