import React from 'react';
import {Text, View} from 'react-native';
import AppStack from './src/navigation/AppStack';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/assets/theme/default';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppStack setHiddenStatusBar={false} />
    </ThemeProvider>
  );
}

export default App;
