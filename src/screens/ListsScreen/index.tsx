import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  NoDataText,
  NoDataTextWrapper,
  SelectorContainer,
  Wrapper,
} from './ListScreen.styles';
import {ListContainer} from '../../containers';
import {useQuery} from '@tanstack/react-query';
import {useAccessToken} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {
  Lists,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
} from '../../components';
import {MediaListStatus} from '../../@types';
import {api} from '../../utils';
import {View} from 'react-native';

const ListsScreen = () => {
  const [type, setType] = React.useState<'ANIME' | 'MANGA'>('ANIME');
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedList, setSelectedList] =
    React.useState<MediaListStatus>('CURRENT');
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const listTypes: {
    name: string;
    value: MediaListStatus;
  }[] = [
    {
      name: type === 'ANIME' ? 'Watching' : 'Reading',
      value: 'CURRENT',
    },
    {
      name: type === 'ANIME' ? 'Plan to Watch' : 'Plan to Read',
      value: 'PLANNING',
    },
    {
      name: 'On Hold',
      value: 'PAUSED',
    },

    {
      name: type === 'ANIME' ? 'Re Watching' : 'Re Reading',
      value: 'REPEATING',
    },
    {
      name: 'Completed',
      value: 'COMPLETED',
    },
    {
      name: 'Dropped',
      value: 'DROPPED',
    },
  ];

  const {isPending, isError, data, error, refetch} = useQuery({
    queryKey: ['user-lists', type],
    queryFn: () => api.fetchAnilistLists(accessToken, anilist, type),
  });

  React.useEffect(() => {
    if (refreshing) {
      refetch();
      setRefreshing(isPending);
    }
  }, [refreshing]);

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (data?.length <= 0)
    return (
      <MiddleOfScreenTextComponent text="Seems like you are not logged in!" />
    );

  const selectedLisData = data[selectedList?.toLowerCase()];

  // const handleGesture = (evt: any) => {
  //   const {nativeEvent} = evt;

  //   const findCurrentList = listTypes.find(
  //     listType => listType.value === selectedList,
  //   );

  //   if (!findCurrentList) return;

  //   const indexOfCurrentList = listTypes.indexOf(findCurrentList);

  //   const nextList =
  //     indexOfCurrentList + 1 > listTypes.length ? 0 : indexOfCurrentList + 1;

  //   const prevList =
  //     indexOfCurrentList - 1 < 0
  //       ? listTypes.length - 1
  //       : indexOfCurrentList - 1;

  //   if (nativeEvent.velocityX > 0) {
  //     // Swipe right
  //     setSelectedList(listTypes[prevList].value);
  //   } else {
  //     // Swipe left
  //     setSelectedList(listTypes[nextList].value);
  //   }
  //   console.log(selectedList);
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          marginTop: 25,
        }}>
        <SelectorContainer>
          <Lists.TypeSelector
            type={type}
            setType={setType}
            selectedColor={data?.color}
          />
          <Lists.Selector
            data={data}
            listTypes={listTypes}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            selectedColor={data?.color}
          />
        </SelectorContainer>
        <Wrapper>
          {selectedLisData?.length === 0 ? (
            <NoDataTextWrapper>
              <NoDataText>This list is empty!</NoDataText>
            </NoDataTextWrapper>
          ) : (
            <ListContainer
              data={selectedLisData}
              selectedList={selectedList}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
              type={type}
            />
          )}
        </Wrapper>
      </View>
    </SafeAreaView>
  );
};

export default ListsScreen;
