import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer} from '../../styles/sharedStyles';
import {Search} from '../../components';
import {AnimeTrending} from '../../utils/TestData';
import {useDebounce} from '../../hooks';
import {api} from '../../utils';
import {API_BASE} from '@env';
import {useQuery} from '@tanstack/react-query';

const SearchScreen = () => {
  const [data, setData] = React.useState();
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchTerm = useDebounce(searchText, 500);

  const fetcher = async () => {
    const getData = await api.fetcher(
      `${API_BASE}/anilist/search/${debouncedSearchTerm}`,
    );
    setData(getData?.results);

    return getData;
  };

  const {isPending, isError, error} = useQuery({
    queryKey: ['searchh', debouncedSearchTerm],
    queryFn: fetcher,
    enabled: debouncedSearchTerm.length > 0,
  });

  return (
    <SafeAreaView>
      <SharedContainer>
        <Search.SearchBar
          search_text={searchText}
          setSearchText={setSearchText}
        />
        {/* <Search.RecentSearches /> */}
        <Search.SearchResults data={data} />
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SearchScreen;
