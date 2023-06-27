import React from 'react';
import AppStack from './src/navigation/AppStack';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/assets/theme/default';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {NavigationProvixer} from './src/contexts';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationProvixer>
          <AppStack setHiddenStatusBar={false} />
        </NavigationProvixer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
