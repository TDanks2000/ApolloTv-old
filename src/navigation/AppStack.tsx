import React, {useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  InfoScreen,
  ListsScreen,
  SearchScreen,
  SettingsScreen,
  VideoPlayerScreen,
  LoggingInScreen,
  VideoSettingScreen,
  TestingScreen,
  ReaderScreen,
  MangaInfoScreen,
} from '../screens';
import {NavigationBar} from '../components';
import {RootStackParamList} from '../@types';
import {utils} from '../utils';
import {SyncingSettingScreen} from '../screens/SettingScreens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  screens: {
    LoggingIn: 'logMeIn/:access_code',
    Home: '/',
    Search: 'search',
  },
};

const linking = {
  prefixes: ['apollotv://'],
  config,
};

const AppStack = ({setHiddenStatusBar}: {setHiddenStatusBar: boolean}) => {
  const navigationRef: any = useNavigationContainerRef();
  const [routeNameRef, setRouteNameRef] = useState<any>();

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        setRouteNameRef(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // Save the current route name for later comparison
          setRouteNameRef(currentRouteName);
        }
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'slide_from_left',
          headerShown: false,
          contentStyle: {
            backgroundColor: '#0f0f0f',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lists" component={ListsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="MangaInfo" component={MangaInfoScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
        <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
        <Stack.Screen name="LoggingIn" component={LoggingInScreen} />
        <Stack.Screen name="testingScreen" component={TestingScreen} />

        {/* SETTINGS */}
        <Stack.Screen name="VideoSettings" component={VideoSettingScreen} />
        <Stack.Screen name="SyncingSettings" component={SyncingSettingScreen} />
        {/* END SETTINGS */}
      </Stack.Navigator>
      <NavigationBar
        currentRoute={routeNameRef === undefined ? 'loading' : routeNameRef}
      />
    </NavigationContainer>
  );
};

export default AppStack;
