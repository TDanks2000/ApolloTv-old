import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

import * as UpdateAPK from 'rn-update-apk';
import {settingsHelper} from '../utils';

export const UpdaterContext = createContext<{
  updater?: UpdateAPK.UpdateAPK;
}>({});

type Props = {
  children: JSX.Element;
};

export const UpdaterProvider = ({children}: Props) => {
  const updater = new UpdateAPK.UpdateAPK({
    apkVersionUrl:
      'https://raw.githubusercontent.com/ApolloTv-team/ApolloTv/master/release.json',
    fileProviderAuthority: 'com.apollotv.provider',
    forceUpdateApp: () => {},
    notNeedUpdateApp: () => {
      Toast.show({
        type: 'info',
        autoHide: true,
        visibilityTime: 5000,
        position: 'top',
        text1: 'App is already up to date 🎉',
        text2: 'No need to update',
      });
    },
    downloadApkStart: () => {
      Toast.show({
        type: 'info',
        autoHide: true,
        visibilityTime: 5000,
        position: 'top',
        text1: 'Update Commencing 🚀 ',
        text2: 'Please wait',
      });
    },
    downloadApkProgress: (progress: any) => {},
    downloadApkEnd: () => {},
    onError: () => {
      Toast.show({
        type: 'error',
        autoHide: true,
        visibilityTime: 5000,
        position: 'top',
        text1: 'Auto Update failed ❌',
        text2: 'Please try again later',
      });
    },

    needUpdateApp: performUpdate => {
      // TODO: create a custom Alert
      Alert.alert(
        'Update Available',
        'New version released, do you want to update?',
        [
          {text: 'Cancel', onPress: () => {}},
          // Note, apps can be large. You may want to check if the network is metered (cellular data) to be nice.
          // Note that the user will likely get a popup saying the device is set to block installs from uknown sources.
          // ...you will need to guide them through that, maybe by explaining it here, before you call performUpdate(true);
          {text: 'Update', onPress: () => performUpdate(true)},
        ],
        {
          userInterfaceStyle: 'dark',
        },
      );
    },
  });

  return (
    <UpdaterContext.Provider
      value={{
        // this can be used to check for updates with a button in settings screen
        updater,
      }}>
      {children}
    </UpdaterContext.Provider>
  );
};
