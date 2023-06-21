import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerComponent, TopBarComponent} from '../../components';
import {BannerContainer} from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <TopBarComponent />
      <BannerContainer>
        <BannerComponent />
      </BannerContainer>
    </SafeAreaView>
  );
};

export default HomeScreen;
