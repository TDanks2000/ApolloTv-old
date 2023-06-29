import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {helpers, storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';
import {useAccessToken} from '../../contexts';

type Props = NativeStackScreenProps<RootStackParamList, 'LoggingIn'>;

const LoggingInScreen = ({route, navigation}: Props) => {
  const {accessToken} = useAccessToken();
  const {params} = route;

  React.useEffect(() => {
    if (accessToken) navigation.navigate('Home');
    if (!params?.access_code) return;
    const token = helpers.parseDeepLinks(params?.access_code);

    if (!token) return;

    try {
      storage.set(ANILIST_ACCESS_TOKEN_STORAGE, token);
      navigation.navigate('Home');
    } catch (error) {}
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
