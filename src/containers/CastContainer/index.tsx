import {FlatList, View} from 'react-native';
import React from 'react';
import {Character, SubOrDub} from '../../@types';
import {CharacterCard} from '../../components';
import {
  SectionTitle,
  SectionTitleContainer,
} from '../Sections/Sections.shared.styles';

interface Props {
  characters: Character[];
  subOrDub: SubOrDub | undefined;
}

const CharacterContainer = ({characters, subOrDub}: Props) => {
  const renderItem = ({item}: {item: Character}) => {
    return (
      <CharacterCard
        {...item}
        key={`character-${item.id}`}
        subOrDub={subOrDub}
      />
    );
  };

  return (
    <>
      <SectionTitleContainer>
        <SectionTitle>Characters</SectionTitle>
      </SectionTitleContainer>

      <FlatList
        style={{marginTop: 15}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={characters}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
      />
    </>
  );
};

export default CharacterContainer;
