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
import {storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';

import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<RootStackParamList, 'LoggingIn'>;

const SettingsScreen = ({navigation}: Props) => {
  const queryClient = useQueryClient();
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
                      },
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
