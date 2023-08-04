import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView, SharedContainer, Title} from '../../../styles/sharedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextContainer} from '../SettingScreens.styles';
import {BackButtonComponent, Settings} from '../../../components';
import {Seperator} from '../../../styles/settings.shared.styles';
import {SettingsContext} from '../../../contexts';

const SyncingSettingScreen = () => {
  const {} = React.useContext(SettingsContext);

  return (
    <SafeAreaView>
      <SharedContainer>
        <TextContainer>
          <BackButtonComponent isModal={false} />
          <Title>Syncing Settings</Title>
        </TextContainer>

        <ScrollView style={{paddingTop: 30, marginTop: 15}}></ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SyncingSettingScreen;
