import {FlatList} from 'react-native';
import {MediaListStatus} from '../../../@types/index';
import {PillContainer, PillLength, PillText} from '../Lists.shared.styles';

interface SelectorProps {
  selectedList: MediaListStatus;
  setSelectedList: (list: MediaListStatus) => void;
  selectedColor?: string;
  listTypes: {name: string; value: MediaListStatus}[];
  data: any;
}

const Selector = ({
  selectedList,
  setSelectedList,
  selectedColor,
  listTypes,
  data,
}: SelectorProps) => {
  const renderItem = ({
    item,
  }: {
    item: {name: string; value: MediaListStatus};
  }) => {
    const selectedLisData = data[item.value?.toLowerCase()];

    const combineData = selectedLisData.reduce((acc: any, list: any) => {
      return acc.concat(list.entries);
    }, []);
    return (
      <PillContainer
        selected={item.value === selectedList}
        onPress={() => setSelectedList(item.value)}
        selectedColor={selectedColor}>
        <PillText>{item.name} </PillText>
        <PillLength>
          {combineData?.length > 100 ? '100+' : combineData?.length ?? '0'}
        </PillLength>
      </PillContainer>
    );
  };

  return (
    <FlatList
      horizontal
      data={listTypes}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={{
        gap: 15,
        paddingHorizontal: 20,
      }}
    />
  );
};

export default Selector;
