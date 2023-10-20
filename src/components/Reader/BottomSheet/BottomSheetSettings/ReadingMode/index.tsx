import {View, Text} from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';

const ReadingMode = () => {
  return (
    <View>
      <SettingTitle>Reading mode</SettingTitle>
      <PillsContainer>
        <PillContainer active={true}>
          <PillText>Default</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Left to Right</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Right to Left</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Vertical</PillText>
        </PillContainer>
      </PillsContainer>
    </View>
  );
};

export default ReadingMode;
