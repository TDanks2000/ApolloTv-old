import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {PillContainer, PillText} from '../Lists.shared.styles';

type Props = {
  type: 'ANIME' | 'MANGA';
  setType: (type: 'ANIME' | 'MANGA') => void;
  selectedColor?: string;
};

const TypeSelector: React.FC<Props> = ({type, setType, selectedColor}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap: 15, paddingHorizontal: 20}}
      style={{
        marginBottom: 15,
      }}>
      <PillContainer
        br="8px"
        selected={type === 'ANIME'}
        selectedColor={selectedColor}
        onPress={() => {
          setType('ANIME');
        }}>
        <PillText>ANIME</PillText>
      </PillContainer>
      <PillContainer
        br="8px"
        selected={type === 'MANGA'}
        selectedColor={selectedColor}
        onPress={() => {
          setType('MANGA');
        }}>
        <PillText>MANGA</PillText>
      </PillContainer>
    </ScrollView>
  );
};

export default TypeSelector;
