import {View, FlatList} from 'react-native';
import React from 'react';
import {MediaSeasons} from '../../../utils/constants';
import {MediaSeason} from '../../../@types';
import {PillComponent} from '../../Shared';

type Props = {
  season?: string;
  setSeason: (value: string) => void;
};

const Season: React.FC<Props> = ({season, setSeason}) => {
  const handlePress = (item: MediaSeason) => {
    setSeason(item === season ? '' : item);
  };

  const renderItem = (item: MediaSeason) => {
    return (
      <PillComponent
        title={item.replaceAll('_', ' ')}
        active={season?.toLowerCase() === item.toLowerCase()}
        onPress={() => handlePress(item)}
      />
    );
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
