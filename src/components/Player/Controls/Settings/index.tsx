import {View, Animated} from 'react-native';
import React, {useEffect} from 'react';
import {SettingsContainer} from './Settings.styles';
import {Text} from '../../../../styles/sharedStyles';
import SettingsSections from './SettingsSections';

type Props = {
  shouldOpen: boolean;
};

const Settings = ({shouldOpen}: Props) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: shouldOpen ? 1 : 0,
      duration: 400, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, [shouldOpen]);

  return (
    <SettingsContainer style={{opacity}} shouldOpen={shouldOpen}>
      <SettingsSections />
    </SettingsContainer>
  );
};

export default Settings;
