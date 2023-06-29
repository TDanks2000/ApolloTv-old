import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {helpers, storage} from '../../utils';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../../utils/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'LoggingIn'>;

const LoggingInScreen = ({route, navigation}: Props) => {
  const {params} = route;

  React.useEffect(() => {
    if (!params?.access_code) return;
    const token = helpers.parseDeepLinks(params?.access_code);

    if (!token) return;

    storage.set(ANILIST_ACCESS_TOKEN_STORAGE, token);
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
