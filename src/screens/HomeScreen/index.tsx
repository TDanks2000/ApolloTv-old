import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerComponent, TopBarComponent} from '../../components';
import {CWContainer, SectionContainer} from './HomeScreen.styles';
import {
  ContuineWatchingContainer,
  GenericSection,
  PopularContainer,
} from '../../containers';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <TopBarComponent />
        <SectionContainer>
          <BannerComponent />
        </SectionContainer>
        <CWContainer>
          <ContuineWatchingContainer />
        </CWContainer>
        <CWContainer>
          <GenericSection sectionTitle="Popular" />
        </CWContainer>
        <CWContainer>
          <GenericSection sectionTitle="Trending" />
        </CWContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
