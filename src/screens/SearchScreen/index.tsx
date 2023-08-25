import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer, SharedContainerRel} from '../../styles/sharedStyles';
import {MiddleOfScreenLoadingComponent, Search} from '../../components';
import {AnimeTrending} from '../../utils/TestData';
import {useDebounceSearch} from '../../hooks';
import {api, helpers} from '../../utils';
import {API_BASE} from '@env';
import {useQuery} from '@tanstack/react-query';

const SearchScreen = () => {
  const [searchForManga, setSearchForManga] = React.useState<boolean>(false);
  const [data, setData] = React.useState();
  const [loading, toggleLoading] = React.useReducer(s => !s, false);
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchTerm = useDebounceSearch(searchText, 500);

  const fetcher = async () => {
    setData(undefined);
    toggleLoading();

    const url = !searchForManga
      ? `${API_BASE}/anilist/search/${debouncedSearchTerm}`
      : `${API_BASE}/anilist-manga/search/${debouncedSearchTerm}`;

    const getData = await api.fetcher(url);

    toggleLoading();
    setData(getData?.results);

    return getData;
  };

  const {isPending, isError, error} = useQuery({
    queryKey: ['searchh', debouncedSearchTerm, searchForManga],
    queryFn: fetcher,
    enabled: debouncedSearchTerm.length > 0,
  });

  return (
    <>
      <SafeAreaView>
        <SharedContainer>
          <Search.SearchBar
            search_text={searchText}
            setSearchText={setSearchText}
          />
          <Search.Options
            wantManga={searchForManga}
            setWantManga={setSearchForManga}
          />
          <Search.RecentSearches
            searchText={debouncedSearchTerm}
            setSearchText={setSearchText}
          />
          <Search.SearchResults
            data={data}
            type={searchForManga ? 'manga' : 'anime'}
          />
        </SharedContainer>
      </SafeAreaView>
      {loading ? <MiddleOfScreenLoadingComponent /> : null}
    </>
  );
};

export default SearchScreen;
