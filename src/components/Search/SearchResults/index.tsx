import {View, FlatList} from 'react-native';
import {MangaListCard, ListCard} from '../../Cards';

const SearchResults = ({data, type}: any) => {
  const renderItem = (item: any) => {
    const props = {
      id: item.id,
      title: item.title,
      color: item.color,
      poster_image: item.image,
      rating: item.rating,
      type: item.type,
      release_year: item.releaseDate ?? item?.startDate?.year,
    };

    if (type === 'manga')
      return <MangaListCard {...props} total_chapters={item.totalChapters} />;
    return (
      <ListCard
        {...props}
        total_episodes={item.totalEpisodes}
        typeOfCard={'search'}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{height: 25}} />}
      contentContainerStyle={{paddingBottom: 100, paddingTop: 20}}
    />
  );
};

export default SearchResults;
