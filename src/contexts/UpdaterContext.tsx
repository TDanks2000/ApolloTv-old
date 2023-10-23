import {createContext, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

//@ts-ignore
import * as UpdateAPK from 'rn-update-apk';

export const UpdaterContext = createContext<
  | {
      checkUpdate: () => void;
    }
  | undefined
>(undefined);

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
  });

  const checkUpdate = () => {
    updater.checkUpdate();
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
