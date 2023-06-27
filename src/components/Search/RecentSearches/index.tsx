import {View} from 'react-native';
import React from 'react';
import {Container, PillContainer, PillTitle} from './RecentSearches.styles';
import {RecentSearchs} from '../../../@types';
import {helpers} from '../../../utils';

interface Props {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

const RecentSearches = ({searchText, setSearchText}: Props) => {
  const [data, setData] = React.useState<string[]>();

  React.useEffect(() => {
    const recentSearchs = helpers.recentSearchs(searchText);

    setData(recentSearchs);
  }, [searchText]);

  const renderItem = (item: any) => (
    <PillContainer onPress={() => setSearchText(item.item)}>
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
