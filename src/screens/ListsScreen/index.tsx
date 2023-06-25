import {FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, SharedContainer} from '../../styles/sharedStyles';
import {AnimeTrending} from '../../utils/TestData';
import {Title, Wrapper} from './ListScreen.styles';
import ListCard from '../../components/ListCard';
import {ListContainer} from '../../containers';

const ListsScreen = () => {
  const {results: data} = AnimeTrending;

  return (
    <SafeAreaView>
      <SharedContainer>
        <Title>WatchList</Title>
        <Wrapper>
          <ListContainer data={data} />
        </Wrapper>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default ListsScreen;
