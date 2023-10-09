import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AiringScheduleComponent,
  BannerComponent,
  TopBarComponent,
} from '../../components';
import {GenericContainer, SectionContainer} from './HomeScreen.styles';
import {
  AiringScheduleContainer,
  ContuineWatchingContainer,
  GenericSection,
  PopularContainer,
} from '../../containers';
import {ScrollView} from '../../styles/sharedStyles';
import {helpers, storage} from '../../utils';
import {RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {GenericContext} from '../../contexts';
import {episodeSQLHelper} from '../../utils/database';
import {addToAnalytics} from '../../utils/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({route}: Props) => {
  const genericContext = React.useContext(GenericContext);
  const hasJustLoggedIn = route?.params?.hasJustLoggedIn;
  const {width} = useWindowDimensions();

  const hasLaunchedBefore = helpers.launchedBefore();

  React.useEffect(() => {
    episodeSQLHelper.createTable();
    addToAnalytics(width);
    if (hasLaunchedBefore) return;
    genericContext?.openAlert(
      'Welcome to ApolloTv',
      'This app is still in early alpha so some features may not be working as of yet',
      'error',
      {
        duration: 10000,
      },
    );
  }, []);

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
          <GenericSection
            sectionTitle="Top Rated"
            sectionType={'top_rated'}
            type="MANGA"
          />
        </GenericContainer>
        <GenericContainer>
          <GenericSection sectionTitle="Trending" sectionType={'trending'} />
        </GenericContainer>

        <GenericContainer>
          <GenericSection
            sectionTitle="Popular"
            sectionType={'popular'}
            type="MANGA"
          />
        </GenericContainer>

        <GenericContainer>
          <AiringScheduleComponent />
        </GenericContainer>

        {/* <GenericContainer> */}
        {/* </GenericContainer> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
