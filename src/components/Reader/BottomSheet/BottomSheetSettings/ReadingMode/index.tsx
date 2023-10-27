import {View, Text} from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';
import {HorizontalType, LayoutMode} from '../../../../../@types';

type Props = {
  layoutMode: LayoutMode;
  setLayoutMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
  horizontalType: HorizontalType;
  setHorizontalType: React.Dispatch<React.SetStateAction<HorizontalType>>;
};

const ReadingMode: React.FC<Props> = ({
  layoutMode,
  setLayoutMode,
  horizontalType,
  setHorizontalType,
}) => {
  const onPress = (mode: LayoutMode, type?: HorizontalType) => {
    setLayoutMode(mode);
    if (type) setHorizontalType(type);
    else setHorizontalType(HorizontalType.disabled);
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
          <PillText>Default</PillText>
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
