import React from 'react';
import {Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, SharedContainer, Title} from '../../styles/sharedStyles';
import {
  BottomImage,
  BottomImageContaoner,
  BottomInfo,
  Disclaimer,
  Social,
  SocialIconWrapper,
  SocialWrapper,
  VersionInfo,
  VersionNumber,
} from './SettingsScreen.styles';
import {Settings} from '../../components';
import {GenericContext, SettingsContext} from '../../contexts';
import {storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';

import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useQueryClient} from '@tanstack/react-query';
import {Seperator} from '../../styles/settings.shared.styles';
import {UpdaterContext} from '../../contexts/UpdaterContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({navigation}: Props) => {
  const {preferedVoice, changePreferedVoice} =
    React.useContext(SettingsContext);
  const queryClient = useQueryClient();
  const genericContext = React.useContext(GenericContext);
  const {checkUpdate} = React.useContext(UpdaterContext);

  const onPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <SharedContainer>
        <Title>Settings</Title>
        <ScrollView style={{paddingTop: 30, marginTop: 15}}>
          <Settings.Section
            key={'Video-settings'}
            title="Video"
            descriptor="Manage video player settings"
            type="navigation"
            settingsScreen={'VideoSettings'}
          />
          <Seperator />

          <Settings.Section
            key={'Syncing-settings'}
            title="Syncing"
            descriptor="Manage syncing settings"
            type="navigation"
            settingsScreen={'SyncingSettings'}
          />

          <Seperator />

          <Settings.Section
            key={'voice-settings'}
            title="Preferred Voice"
            descriptor="Voice language e.g. Sub or Dub"
            type="prefered_voice"
            onPress={() => {
              if (changePreferedVoice) changePreferedVoice();
            }}
            selectedOption={preferedVoice === 'dub' ? 'DUB (EN)' : 'SUB (JP)'}
          />

          <Seperator />

          <Settings.Section
            key={'log-out-settings'}
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
                      onPress: () => {},
                      style: 'default',
                    },
                    {
                      text: 'Confirm',
                      onPress: async () => {
                        storage.delete(ANILIST_ACCESS_TOKEN_STORAGE);
                        Toast.show({
                          type: 'success',
                          text1: 'Logged out successfully',
                        });
                        navigation.navigate('Home', {
                          hasJustLoggedIn: false,
                        });

                        queryClient.invalidateQueries({queryKey: ['Top-Bar']});
                        queryClient.invalidateQueries({
                          queryKey: ['user-lists'],
                        });
                      },
                      style: 'default',
                    },
                  ],
                },
              )
            }
          />

          <Seperator />

          <Settings.Section
            key={'check-for-update-setting'}
            title="Check for update"
            descriptor="Check for a new version of the app"
            type="check_for_update"
            onPress={async () => {
              if (checkUpdate) await checkUpdate();
            }}
          />

          <Seperator />

          <BottomInfo>
            <BottomImageContaoner>
              <BottomImage
                source={require('../../assets/images/Apollotv-banner(no-bg).png')}
              />

              <VersionInfo>
                <VersionNumber>
                  V {require('../../../package.json').version} Alpha
                </VersionNumber>
              </VersionInfo>
              <SocialWrapper>
                <SocialIconWrapper
                  onPress={() =>
                    onPress('https://github.com/apollotv-team/apollotv')
                  }>
                  <Social name="github" />
                </SocialIconWrapper>
                <SocialIconWrapper
                  onPress={() => onPress('https://discord.gg/ysZtjn6ED3')}>
                  <Social name="discord" />
                </SocialIconWrapper>
              </SocialWrapper>
              <Disclaimer>
                ApolloTv does not store any files on its server. {'\n'} All
                contents are provided by non-affiliated third parties.
              </Disclaimer>
            </BottomImageContaoner>
          </BottomInfo>
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SettingsScreen;
