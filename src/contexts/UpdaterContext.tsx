import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

import * as UpdateAPK from 'rn-update-apk';

export const UpdaterContext = createContext<{
  checkUpdate?: () => void;
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
        position: 'top',
        text1: 'App is Up-to-date',
      });
    },
    downloadApkStart: () => {
      Toast.show({
        type: 'info',
        autoHide: true,
        position: 'top',
        text1: 'Up-date Started.',
      });
    },
    downloadApkProgress: (progress: any) => {},
    downloadApkEnd: () => {},
    onError: () => {
      Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: 'Auto-update Faield',
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

  const checkUpdate = async () => {
    await updater.checkUpdate();
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  return (
    <UpdaterContext.Provider
      value={{
        // this can be used to check for updates with a button in settings screen
        checkUpdate,
      }}>
      {children}
    </UpdaterContext.Provider>
  );
};
