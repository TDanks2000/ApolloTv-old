import React from 'react';
import {LogBox} from 'react-native';
import AppStack from './src/navigation/AppStack';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/assets/theme/default';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {
  AccessTokenProvider,
  NavigationProvixer,
  useAccessToken,
} from './src/contexts';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './src/styles/toastconfig';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  LogBox.ignoreAllLogs();

  return (
    <AccessTokenProvider>
      <InnerApp />
    </AccessTokenProvider>
  );
};

const InnerApp = () => {
  const {checkedForToken, accessToken} = useAccessToken();

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationProvixer>
          <AppStack setHiddenStatusBar={false} />
        </NavigationProvixer>
      </QueryClientProvider>
      <Toast autoHide={true} config={toastConfig} />
    </ThemeProvider>
  );
};

export default App;
