import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {helpers, storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';
import {useAccessToken} from '../../contexts';

import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<RootStackParamList, 'LoggingIn'>;

const LoggingInScreen = ({route, navigation}: Props) => {
  const queryClient = useQueryClient();

  const {accessToken} = useAccessToken();
  const {params} = route;

  const dismessTime = 3000;
  React.useEffect(() => {
    if (accessToken) {
      Toast.show({
        type: 'info',
        text1: 'Well done you just tried to log in again 😵',
        text2: 'You seem to be already logged in',
        position: 'top',
        visibilityTime: dismessTime,
      });
      navigation.navigate('Home', {});
    }
    if (!params?.access_code) return;
    const token = helpers.parseDeepLinks(params?.access_code);

    if (!token) return;

    storage.set(ANILIST_ACCESS_TOKEN_STORAGE, token);
    Toast.show({
      type: 'success',
      text1: '🎉🎊🍾',
      text2: 'You have been successfully logged in',
      position: 'top',
      visibilityTime: dismessTime,
    });
    queryClient.invalidateQueries({queryKey: ['Top-Bar'], exact: false});

    navigation.navigate('Home', {
      hasJustLoggedIn: true,
    });
  }, [params?.access_code]);

  if (!params?.access_code)
    return (
      <View>
        <Text>Please Wait, while we get you set up</Text>
      </View>
    );

  return (
    <View>
      <Text>Please Wait, while we get you set up</Text>
      <Text>{helpers.parseDeepLinks(params?.access_code)}</Text>
    </View>
  );
};

export default LoggingInScreen;
