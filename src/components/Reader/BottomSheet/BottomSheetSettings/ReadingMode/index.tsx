import {View, Text} from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';
import {HorizontalType, LayoutMode} from '../../../../../@types';
import {ReaderSettingsContext} from '../../../../../contexts/ReaderSettingsContext';

type Props = {};

const ReadingMode: React.FC<Props> = ({}) => {
  const {setLayoutMode, setHorizontalType, layoutMode, horizontalType} =
    React.useContext(ReaderSettingsContext);

  const onPress = (mode: LayoutMode, type?: HorizontalType) => {
    if (setLayoutMode) setLayoutMode(mode);
    if (type && setHorizontalType) setHorizontalType(type);
    else if (setHorizontalType) setHorizontalType(HorizontalType.disabled);
  };

  return (
    <View>
      <SettingTitle>Reading mode</SettingTitle>
      <PillsContainer>
        <PillContainer
          active={
            layoutMode === LayoutMode.Horizontal &&
            horizontalType === HorizontalType.disabled
          }
          onPress={() => {
            onPress(LayoutMode.Horizontal);
          }}>
          <PillText>Horizontal</PillText>
        </PillContainer>
        <PillContainer
          active={
            layoutMode === LayoutMode.Horizontal &&
            horizontalType === HorizontalType.ltr
          }
          onPress={() => {
            onPress(LayoutMode.Horizontal, HorizontalType.ltr);
          }}>
          <PillText>Left to Right</PillText>
        </PillContainer>
        <PillContainer
          active={
            layoutMode === LayoutMode.Horizontal &&
            horizontalType === HorizontalType.rtl
          }
          onPress={() => {
            onPress(LayoutMode.Horizontal, HorizontalType.rtl);
          }}>
          <PillText>Right to Left</PillText>
        </PillContainer>
        <PillContainer
          active={layoutMode === LayoutMode.Vertical}
          onPress={() => {
            onPress(LayoutMode.Vertical);
          }}>
          <PillText>Vertical</PillText>
        </PillContainer>
      </PillsContainer>
    </View>
  );
};

export default ReadingMode;
