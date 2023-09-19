import {View, FlatList} from 'react-native';
import React from 'react';
import {ListCard} from '../../components/Cards';
import {utils} from '../../utils';
import {useBreakpoints} from '../../hooks';

const ListContainer = ({data}: any) => {
  const {isMobile} = useBreakpoints();
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

  if (!isMobile)
    return (
      <FlatList
        key={`mobile-flatlist-lists`}
        data={combineData}
        renderItem={({item}) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 250,
          paddingTop: 20,
          gap: 25,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        snapToAlignment="center"
      />
    );

  return (
    <FlatList
      key={`flatlist-lists`}
      data={combineData}
      renderItem={({item}) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 250,
        paddingTop: 20,
        gap: 25,
      }}
      snapToAlignment="center"
    />
  );
};

export default ListContainer;
