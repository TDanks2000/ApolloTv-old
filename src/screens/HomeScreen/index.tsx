import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerComponent, TopBarComponent} from '../../components';
import {CWContainer, SectionContainer} from './HomeScreen.styles';
import {ContuineWatchingContainer} from '../../containers';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <TopBarComponent />
      <SectionContainer>
        <BannerComponent />
      </SectionContainer>
      <CWContainer>
        <ContuineWatchingContainer />
      </CWContainer>
    </SafeAreaView>
  );
};

export default HomeScreen;
