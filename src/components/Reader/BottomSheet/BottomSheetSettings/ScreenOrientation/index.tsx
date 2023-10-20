import {View, Text} from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';

const ScreenOrientation = () => {
  return (
    <View>
      <SettingTitle>Screen Orientation</SettingTitle>
      <PillsContainer>
        <PillContainer active={true}>
          <PillText>Default</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Unlocked</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Portrait</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Locked Portrait</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Landscape</PillText>
        </PillContainer>
        <PillContainer>
          <PillText>Locked Landscape</PillText>
        </PillContainer>
      </PillsContainer>
    </View>
  );
};

export default ScreenOrientation;
