import 'react-native-gesture-handler';

import React from 'react';
import {LogBox} from 'react-native';
import AppStack from './src/navigation/AppStack';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/assets/theme/default';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {
  AccessTokenProvider,
  GenericContext,
  GenericContextProvider,
  NavigationProvixer,
  SettingsProvider,
  useAccessToken,
} from './src/contexts';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './src/styles/toastconfig';
import {Alert} from './src/components';
import {UpdaterProvider} from './src/contexts/UpdaterContext';
import {useCheckForUpdate, useAnalytics} from './src/hooks';
import './src/i18n';
import {DownloadQueueProvider} from './src/contexts/DownloadQueue';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  LogBox.ignoreAllLogs();

  return (
    <AccessTokenProvider>
      <GenericContextProvider>
        <SettingsProvider>
          <UpdaterProvider>
            <DownloadQueueProvider>
              <InnerApp />
            </DownloadQueueProvider>
          </UpdaterProvider>
        </SettingsProvider>
      </GenericContextProvider>
    </AccessTokenProvider>
  );
};

const InnerApp = () => {
  const {checkedForToken, accessToken} = useAccessToken();
  const genericContext = React.useContext(GenericContext);
  useCheckForUpdate();
  useAnalytics();
  requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationProvixer>
          <AppStack />
        </NavigationProvixer>
      </QueryClientProvider>
      <Toast autoHide={true} config={toastConfig} />
      <Alert
        alertState={genericContext!.alertState}
        closeAlert={genericContext!.closeAlert}
      />
    </ThemeProvider>
  );
};

export default App;
