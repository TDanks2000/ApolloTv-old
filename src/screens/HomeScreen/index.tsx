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
import {RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({route}: Props) => {
  const hasJustLoggedIn = route?.params?.hasJustLoggedIn;

  React.useEffect(() => {
    if (!hasJustLoggedIn) return;
  }, [hasJustLoggedIn]);

  return (
    <SafeAreaView>
      <ScrollView style={{marginTop: 15}}>
        <TopBarComponent hasJustLoggedIn={hasJustLoggedIn} />
        <SectionContainer>
          <BannerComponent />
        </SectionContainer>
        <ContuineWatchingContainer />
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
