import { View, Text } from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';
import Orientation from 'react-native-orientation-locker';
import { OrientationType } from '../../../../../@types';

const ScreenOrientation = () => {
  const [screenOrientation, setScreenOrientation] =
    React.useState<OrientationType>(OrientationType.unlocked);

  const changeOrientation = React.useCallback(() => {
    // screenOrientation
    if (
      screenOrientation === OrientationType.landscape ||
      screenOrientation === OrientationType.locked_landscape
    ) {
      // Locked to landscape
      Orientation.lockToLandscape();
    } else if (screenOrientation === OrientationType.portrait_reverse) {
      Orientation.lockToPortraitUpsideDown();
    } else if (
      screenOrientation === OrientationType.locked_portrait ||
      screenOrientation === OrientationType.portrait
    ) {
      // Portrait
      Orientation.lockToPortrait();
    } else if (screenOrientation === OrientationType.unlocked) {
      // Default or unlocked
      Orientation.unlockAllOrientations();
    } else if (screenOrientation === OrientationType.landscape_left) {
      // landscape left
      Orientation.lockToLandscapeLeft();
    } else if (screenOrientation === OrientationType.landscape_right) {
      // landscape right
      Orientation.lockToLandscapeRight();
    } else {
      // Handle the case for an unrecognized orientation
      // This block is executed for any unrecognized or unexpected value
      // You might add specific handling here if needed
      console.log('Unrecognized screen orientation:', screenOrientation);
      // Perform a default action if necessary
      Orientation.unlockAllOrientations();
    }
  }, [screenOrientation])

  React.useEffect(() => {
    changeOrientation()
  }, [screenOrientation]);

  React.useEffect(() => {
    return () => {
      Orientation.unlockAllOrientations();
      setScreenOrientation(OrientationType.unlocked);
    };
  }, []);

  return (
    <View>
      <SettingTitle>Screen Orientation</SettingTitle>
      <PillsContainer>
        <PillContainer
          active={screenOrientation === OrientationType.unlocked}
          onPress={() => setScreenOrientation(OrientationType.unlocked)}>
          <PillText>Unlocked</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.portrait}
          onPress={() => setScreenOrientation(OrientationType.portrait)}>
          <PillText>Portrait</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.portrait_reverse}
          onPress={() =>
            setScreenOrientation(OrientationType.portrait_reverse)
          }>
          <PillText>Portrait upside down</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape}
          onPress={() => setScreenOrientation(OrientationType.landscape)}>
          <PillText>Landscape</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape_left}
          onPress={() => setScreenOrientation(OrientationType.landscape_left)}>
          <PillText>Landscape (left)</PillText>
        </PillContainer>
        <PillContainer
          active={screenOrientation === OrientationType.landscape_right}
          onPress={() => setScreenOrientation(OrientationType.landscape_right)}>
          <PillText>Landscape (right)</PillText>
        </PillContainer>
      </PillsContainer>
    </View>
  );
};

export default ScreenOrientation;
