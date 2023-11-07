import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MiddleOfScreenLoadingComponent, Search} from '../../components';
import {useDebounceSearch} from '../../hooks';
import {SearchFilterOptions} from '../../modals';
import {SharedContainer} from '../../styles/sharedStyles';
import {api} from '../../utils';

const SearchScreen = () => {
  const [searchForManga, setSearchForManga] = React.useState<boolean>(false);
  const [year, setYear] = React.useState<string>();
  const [genres, setGenres] = React.useState<string[]>([]);
  const [season, setSeason] = React.useState<string>();
  const [format, setFormat] = React.useState<string>();
  const [status, setStatus] = React.useState<string>();
  const [sort, setSort] = React.useState<string[]>([]);

  const [showFilterOptions, setShowFilterOptions] =
    React.useState<boolean>(false);

  const [data, setData] = React.useState();
  const [loading, toggleLoading] = React.useReducer(s => !s, false);
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchTerm = useDebounceSearch(searchText, 500);

  const fetcher = async () => {
    setData(undefined);
    toggleLoading();

    const getData = (await api.Search({
      query: debouncedSearchTerm,
      format,
      genres,
      season,
      status,
      year,
      type: searchForManga ? 'MANGA' : 'ANIME',
    })) as any;

    toggleLoading();
    setData(getData?.results);

    return getData;
  };

  const {isPending, isError, error} = useQuery({
    queryKey: [
      'search',
      debouncedSearchTerm,
      searchForManga,
      format,
      genres,
      season,
      status,
      year,
    ],
    queryFn: fetcher,
  });

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <SharedContainer>
          <Search.SearchBar
            search_text={searchText}
            setSearchText={setSearchText}
            setShowFilterOptions={setShowFilterOptions}
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

      <SearchFilterOptions
        showModal={showFilterOptions}
        setShowModal={setShowFilterOptions}
        wantManga={searchForManga}
        setWantManga={setSearchForManga}
        year={year}
        genres={genres}
        season={season}
        format={format}
        status={status}
        sort={sort}
        setYear={setYear}
        setGenres={setGenres}
        setSeason={setSeason}
        setFormat={setFormat}
        setStatus={setStatus}
        setSort={setSort}
      />
    </>
  );
};

export default SearchScreen;
