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
  NewsScreen,
  NewsInfoScreen,
} from '../screens';
import {NavigationBar} from '../components';
import {RootStackParamList} from '../@types';
import {utils} from '../utils';
import {SyncingSettingScreen} from '../screens/SettingScreens';
import {
  OrientationLocker,
  LANDSCAPE,
  PORTRAIT,
} from 'react-native-orientation-locker';
import {StatusBar, Platform} from 'react-native';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

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

const AppStack = () => {
  const navigationRef: any = useNavigationContainerRef();
  const [routeNameRef, setRouteNameRef] = useState<any>();

  React.useEffect(() => {
    utils.ToggleSystemNavigation(
      !(routeNameRef === 'VideoPlayer' || routeNameRef === 'ReaderScreen'),
    );
  }, [routeNameRef]);

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
      <OrientationLocker orientation={Platform.isTV ? LANDSCAPE : PORTRAIT} />
      <StatusBar hidden={false} showHideTransition={'slide'} />
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
        <Stack.Screen
          name="VideoPlayer"
          component={gestureHandlerRootHOC(VideoPlayerScreen)}
        />
        <Stack.Screen
          name="ReaderScreen"
          component={gestureHandlerRootHOC(ReaderScreen)}
        />
        <Stack.Screen name="LoggingIn" component={LoggingInScreen} />
        <Stack.Screen name="testingScreen" component={TestingScreen} />
        <Stack.Screen name="news" component={NewsScreen} />
        <Stack.Screen name="newsInfo" component={NewsInfoScreen} />

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
