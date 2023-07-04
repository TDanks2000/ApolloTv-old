import {View, FlatList} from 'react-native';
import React from 'react';
import ListCard from '../../components/ListCard';
import {utils} from '../../utils';

const ListContainer = ({data}: any) => {
  const renderItem = ({media: item}: any) => {
    const actualTitle = utils.getTitle(item.title);
    return (
      <ListCard
        id={item.id}
        title={actualTitle as string}
        color={item.coverImage.color}
        poster_image={item.coverImage.large}
        rating={item.averageScore}
        total_episodes={item.episodes}
        type={item.type}
        release_year={item.seasonYear}
      />
    );
  };

  const combineData = data.reduce((acc: any, list: any) => {
    return acc.concat(list.entries);
  }, []);

  if (!combineData) return null;
  return (
    <FlatList
      data={combineData}
      renderItem={({item}) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{height: 25}} />}
      contentContainerStyle={{paddingBottom: 250, paddingTop: 20}}
      snapToAlignment="center"
    />
  );
};

export default ListContainer;
