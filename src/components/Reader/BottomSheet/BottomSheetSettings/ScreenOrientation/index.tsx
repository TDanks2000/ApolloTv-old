import {View, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';
import Orientation from 'react-native-orientation-locker';
import {OrientationType} from '../../../../../@types';
import {useFocusEffect} from '@react-navigation/native';
import {ReaderSettingsContext} from '../../../../../contexts/ReaderSettingsContext';

type Props = {};

const ScreenOrientation: React.FC<Props> = () => {
  const {screenOrientation, setScreenOrientation} = React.useContext(
    ReaderSettingsContext,
  );

  const onPress = useCallback((type: OrientationType) => {
    if (setScreenOrientation) setScreenOrientation(type);

    // screenOrientation
    if (
      type === OrientationType.landscape ||
      type === OrientationType.locked_landscape
    ) {
      // Locked to landscape
      return Orientation.lockToLandscape();
    }
    if (type === OrientationType.portrait_reverse) {
      return Orientation.lockToPortraitUpsideDown();
    }
    if (
      type === OrientationType.locked_portrait ||
      type === OrientationType.portrait
    ) {
      // Portrait
      return Orientation.lockToPortrait();
    }
    if (type === OrientationType.unlocked) {
      // Default or unlocked
      return Orientation.unlockAllOrientations();
    }
    if (type === OrientationType.landscape_left) {
      // landscape left
      return Orientation.lockToLandscapeLeft();
    }

    if (type === OrientationType.landscape_right) {
      // landscape right
      return Orientation.lockToLandscapeRight();
    }

    // Handle the case for an unrecognized orientation
    // This block is executed for any unrecognized or unexpected value
    // You might add specific handling here if needed
    console.log('Unrecognized screen orientation:', screenOrientation);
    // Perform a default action if necessary
    Orientation.unlockAllOrientations();
  }, []);

  return (
    <View>
      <SettingTitle>Screen Orientation</SettingTitle>
      <PillsContainer>
        <PillContainer
          active={screenOrientation === OrientationType.unlocked}
          onPress={() => onPress(OrientationType.unlocked)}>
          <PillText>Unlocked</PillText>
        </PillContainer>
        <PillContainer
          active={
            screenOrientation === OrientationType.portrait ||
            screenOrientation === undefined
          }
          onPress={() => onPress(OrientationType.portrait)}>
          <PillText>Portrait</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.portrait_reverse}
          onPress={() => onPress(OrientationType.portrait_reverse)}>
          <PillText>Portrait upside down</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape}
          onPress={() => onPress(OrientationType.landscape)}>
          <PillText>Landscape</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape_left}
          onPress={() => onPress(OrientationType.landscape_left)}>
          <PillText>Landscape (left)</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape_right}
          onPress={() => onPress(OrientationType.landscape_right)}>
          <PillText>Landscape (right)</PillText>
        </PillContainer>
      </PillsContainer>
    </View>
  );
};

export default ScreenOrientation;
