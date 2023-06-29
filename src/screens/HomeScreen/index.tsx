import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerComponent, TopBarComponent} from '../../components';
import {CWContainer, SectionContainer} from './HomeScreen.styles';
import {
  ContuineWatchingContainer,
  GenericSection,
  PopularContainer,
} from '../../containers';
import {ScrollView} from '../../styles/sharedStyles';
import {storage} from '../../utils';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <TopBarComponent />
        <SectionContainer>
          <BannerComponent />
        </SectionContainer>
        {/* <CWContainer>
          <ContuineWatchingContainer />
        </CWContainer> */}
        <CWContainer>
          <GenericSection sectionTitle="Top Rated" sectionType={'top_rated'} />
        </CWContainer>
        <CWContainer>
          <GenericSection sectionTitle="Trending" sectionType={'trending'} />
        </CWContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
