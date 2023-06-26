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
} from '../screens';
import {NavigationBar} from '../components';
import {PlayerModal} from '../modals';

const Stack = createNativeStackNavigator();

const AppStack = ({setHiddenStatusBar}: {setHiddenStatusBar: boolean}) => {
  const navigationRef: any = useNavigationContainerRef();
  const [routeNameRef, setRouteNameRef] = useState<any>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteNameRef(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // console.log(currentRouteName);
          // Save the current route name for later comparison
          setRouteNameRef(currentRouteName);
        }
      }}>
      <PlayerModal />

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
      </Stack.Navigator>
      <NavigationBar
        currentRoute={routeNameRef === undefined ? 'loading' : routeNameRef}
      />
    </NavigationContainer>
  );
};

export default AppStack;
