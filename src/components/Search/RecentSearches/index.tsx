import {View} from 'react-native';
import React from 'react';
import {Container, PillContainer, PillTitle} from './RecentSearches.styles';
import {RecentSearchs} from '../../../@types';
import {helpers} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

interface Props {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

const RecentSearches = ({searchText, setSearchText}: Props) => {
  const [forceRefresh, setForceRefresh] = React.useState(false);
  const [data, setData] = React.useState<string[]>();

  const setTheData = async () => {
    const recentSearchs = await helpers.recentSearchs(searchText);

    setData(recentSearchs);
  };

  React.useEffect(() => {
    setTheData();
  }, [searchText]);

  React.useEffect(() => {
    if (!forceRefresh) return;
    setTheData();
    setForceRefresh(false);
  }, [forceRefresh]);

  const deleteSearch = (item: string) => {
    helpers.RemoveFromRecentSearches(item);
    setForceRefresh(!forceRefresh);
  };

  const renderItem = (item: any) => (
    <PillContainer
      onPress={() => setSearchText(item.item)}
      onLongPress={() => deleteSearch(item.item)}>
      <PillTitle>{item.item}</PillTitle>
    </PillContainer>
  );

  if (!data) return null;
  return (
    <Container
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
      ItemSeparatorComponent={() => <View style={{width: 5}} />}
    />
  );
};

export default RecentSearches;
