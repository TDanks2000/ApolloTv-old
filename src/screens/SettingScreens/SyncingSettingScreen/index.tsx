import React from 'react';
import {ScrollView, SharedContainer, Title} from '../../../styles/sharedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextContainer} from '../SettingScreens.styles';
import {BackButtonComponent, Settings} from '../../../components';
import {GenericContext, SettingsContext} from '../../../contexts';
import {useQueryClient} from '@tanstack/react-query';
import {storage} from '../../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../../utils/constants';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '../../../@types';
import {Seperator} from '../../../styles/settings.shared.styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SyncingSettingScreen = ({navigation}: Props) => {
  const {privateMode, changePrivateMode} = React.useContext(SettingsContext);
  const queryClient = useQueryClient();
  const genericContext = React.useContext(GenericContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SharedContainer>
        <TextContainer>
          <BackButtonComponent isModal={false} />
          <Title>Syncing Settings</Title>
        </TextContainer>

        <ScrollView style={{paddingTop: 20, marginTop: 10}}>
          <Settings.Setting
            title="Private mode"
            descriptor="Keep your watch history between you and yourself only"
            selectedOption={privateMode === 'on' ? 'On' : 'Off'}
            onPress={() => {
              if (changePrivateMode) changePrivateMode();
            }}
          />

          <Seperator />

          <Settings.Section
            key={'log-out-settings'}
            title="Log Out"
            descriptor="Log out of anilist"
            type="log_out"
            onPress={() =>
              genericContext!.openAlert(
                'Log out',
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
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default SyncingSettingScreen;
