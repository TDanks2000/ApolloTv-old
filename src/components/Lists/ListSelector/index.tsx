import {FlatList, View} from 'react-native';
import React from 'react';
import {MediaListStatus} from '../../../@types/index';
import {PillContainer, PillText} from './ListSelector.styles';

interface SelectorProps {
  selectedList: MediaListStatus;
  setSelectedList: (list: MediaListStatus) => void;
  selectedColor?: string;
  listTypes: {name: string; value: MediaListStatus}[];
}

const Selector = ({
  selectedList,
  setSelectedList,
  selectedColor,
  listTypes,
}: SelectorProps) => {
  const renderItem = ({
    item,
  }: {
    item: {name: string; value: MediaListStatus};
  }) => {
    return (
      <PillContainer
        selected={item.value === selectedList}
        onPress={() => setSelectedList(item.value)}
        selectedColor={selectedColor}>
        <PillText>{item.name}</PillText>
      </PillContainer>
    );
  };

  return (
    <FlatList
      horizontal
      data={listTypes}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
    />
  );
};

export default Selector;
