import {View, Text} from 'react-native';
import React from 'react';
import {
  PillContainer,
  PillText,
  PillsContainer,
  SettingTitle,
} from '../BottomSheetSettings.styles';
import Orientation from 'react-native-orientation-locker';
import {OrientationType} from '../../../../../@types';

const ScreenOrientation = () => {
  const [screenOrientation, setScreenOrientation] =
    React.useState<OrientationType>(OrientationType.unlocked);

  React.useEffect(() => {
    // screenOrientation
    switch (screenOrientation) {
      case OrientationType.landscape:
      case OrientationType.locked_landscape:
        // Locked to landscape
        Orientation.lockToLandscape();
        break;
      case OrientationType.portrait_reverse:
        Orientation.lockToPortraitUpsideDown();
        break;
      case OrientationType.locked_portrait:
      case OrientationType.portrait:
        // Portrait
        Orientation.lockToPortrait();
        break;
      case OrientationType.unlocked:
      default:
        // Default or unlocked
        Orientation.unlockAllOrientations();
        break;
    }
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
      </PillsContainer>
    </View>
  );
};

export default ScreenOrientation;
