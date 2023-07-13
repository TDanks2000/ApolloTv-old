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

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  LogBox.ignoreAllLogs();

  return (
    <AccessTokenProvider>
      <GenericContextProvider>
        <InnerApp />
      </GenericContextProvider>
    </AccessTokenProvider>
  );
};

const InnerApp = () => {
  const {checkedForToken, accessToken} = useAccessToken();
  const genericContext = React.useContext(GenericContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationProvixer>
          <SettingsProvider>
            <AppStack setHiddenStatusBar={false} />
          </SettingsProvider>
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
