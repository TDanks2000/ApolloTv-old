import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AiringScheduleComponent,
  BannerComponent,
  TopBarComponent,
} from '../../components';
import {GenericContainer, SectionContainer} from './HomeScreen.styles';
import {ContuineWatchingContainer, GenericSection} from '../../containers';
import {RefreshControlStyled, ScrollView} from '../../styles/sharedStyles';
import {helpers} from '../../utils';
import {RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GenericContext} from '../../contexts';
import {episodeSQLHelper} from '../../utils/database';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({route}: Props) => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);
  const genericContext = React.useContext(GenericContext);
  const hasJustLoggedIn = route?.params?.hasJustLoggedIn;

  const hasLaunchedBefore = helpers.launchedBefore();

  React.useEffect(() => {
    episodeSQLHelper.createTable();
    if (!hasLaunchedBefore) {
      genericContext?.openAlert(
        'Welcome to ApolloTv',
        'This app is still in early alpha so some features may not be working as of yet',
        'error',
        {
          duration: 10000,
        },
      );
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={{marginTop: 15}}
        refreshControl={
          <RefreshControlStyled
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
            }}
          />
        }>
        <TopBarComponent
          hasJustLoggedIn={hasJustLoggedIn}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
        />
        <SectionContainer>
          <BannerComponent />
        </SectionContainer>
        <ContuineWatchingContainer />
        <GenericContainer>
          <GenericSection
            sectionTitle={t('top_rated')}
            sectionType={'top_rated'}
          />
        </GenericContainer>
        <GenericContainer>
          <GenericSection
            sectionTitle={t('top_rated')}
            sectionType={'top_rated'}
            type="MANGA"
          />
        </GenericContainer>
        <GenericContainer>
          <GenericSection
            sectionTitle={t('trending')}
            sectionType={'trending'}
          />
        </GenericContainer>

        <GenericContainer>
          <GenericSection
            sectionTitle={t('popular')}
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
