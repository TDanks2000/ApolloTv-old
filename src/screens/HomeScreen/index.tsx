import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerComponent, TopBarComponent} from '../../components';
import {GenericContainer, SectionContainer} from './HomeScreen.styles';
import {
  AiringScheduleContainer,
  ContuineWatchingContainer,
  GenericSection,
  PopularContainer,
} from '../../containers';
import {ScrollView} from '../../styles/sharedStyles';
import {storage} from '../../utils';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{marginTop: 15}}>
        <TopBarComponent />
        <SectionContainer>
          <BannerComponent />
        </SectionContainer>
        {/* <GenericContainer>
          <ContuineWatchingContainer />
        </GenericContainer> */}
        <GenericContainer>
          <GenericSection sectionTitle="Top Rated" sectionType={'top_rated'} />
        </GenericContainer>
        <GenericContainer>
          <GenericSection sectionTitle="Trending" sectionType={'trending'} />
        </GenericContainer>
        {/* <GenericContainer> */}
        {/* <AiringScheduleContainer /> */}
        {/* </GenericContainer> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
