import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer} from '../../styles/sharedStyles';
import {Search} from '../../components';
import {AnimeTrending} from '../../utils/TestData';

const SearchScreen = () => {
  const {results: data} = AnimeTrending;
  const [searchText, setSearchText] = React.useState('');
  return (
    <SafeAreaView>
      <SharedContainer>
        <Search.SearchBar
          search_text={searchText}
          setSearchText={setSearchText}
        />
        <Search.RecentSearches />
        <Search.SearchResults data={data} />
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SearchScreen;
