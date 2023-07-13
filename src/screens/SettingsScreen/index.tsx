import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, SharedContainer, Text} from '../../styles/sharedStyles';
import {
  BottomImage,
  BottomImageContaoner,
  BottomInfo,
  Seperator,
  Title,
} from './SettingsScreen.styles';
import {Settings} from '../../components';
import {GenericContext} from '../../contexts';

const SettingsScreen = () => {
  const genericContext = React.useContext(GenericContext);
  return (
    <SafeAreaView>
      <SharedContainer>
        <Title>Settings</Title>
        <ScrollView style={{marginTop: 20}}>
          <Settings.Section
            title="Video"
            descriptor="Manage video player settings"
            type="video"
            settingsScreen={<View />}
          />

          <Seperator />

          <Settings.Section
            title="Prefered Voice"
            descriptor="Voice language e.g. Sub or Dub"
            type="prefered_voice"
            options={[]}
          />

          <Seperator />

          <Settings.Section
            title="Log Out"
            descriptor="Log out of anilist"
            type="log_out"
            onPress={() =>
              genericContext!.openAlert(
                'Logout',
                'Are you sure you want to log out?',
                'info',
                {
                  options: [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel'),
                      style: 'default',
                    },
                    {
                      text: 'Confirm',
                      onPress: () => console.log('Confirm'),
                      style: 'default',
                    },
                  ],
                },
              )
            }
          />

          <Seperator />

          <BottomInfo>
            <BottomImageContaoner>
              <BottomImage
                source={require('../../assets/images/Apollotv-banner(no-bg).png')}
              />
            </BottomImageContaoner>
          </BottomInfo>
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SettingsScreen;
