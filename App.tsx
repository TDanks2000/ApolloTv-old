import React from 'react';
import AppStack from './src/navigation/AppStack';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/assets/theme/default';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PlayerModal} from './src/modals';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AppStack setHiddenStatusBar={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
