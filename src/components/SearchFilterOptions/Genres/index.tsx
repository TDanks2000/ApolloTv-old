import {View, FlatList} from 'react-native';
import React from 'react';
import {Genres as GenresArray} from '../../../utils/constants';
import {GENRES} from '../../../@types';
import {PillComponent} from '../../Shared';

type Props = {
  genres?: string[];
  setGenres: (value: string[]) => void;
};

const Genres: React.FC<Props> = ({genres, setGenres}) => {
  const handlePress = (item: GENRES) => {
    if (genres?.includes(item)) {
      setGenres(genres!.filter(genre => genre !== item));
    } else {
      setGenres([...genres!, item]);
    }
  };

  const renderItem = (item: GENRES) => {
    return (
      <PillComponent
        title={item}
        onPress={() => handlePress(item)}
        active={genres!.includes(item)}
      />
    );
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
