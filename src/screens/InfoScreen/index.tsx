import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info} from '../../components';
import {DescriptionComponent} from '../../components/Shared';
import {ScrollView} from '../../styles/sharedStyles';
import {EpisodesModal} from '../../modals';
import {InfoData} from '../../utils/TestData';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
  const data = InfoData;
  const [showEpisodesModal, setShowEpisodesModal] = React.useState(false);

  const navigate: any = useNavigation();
  const {id} = route.params;

  useEffect(() => {
    if (!id) return navigate.navigate('Home');
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Info.Top />
        <Info.ContinueWatching />
        <Info.Options openEpisodesModal={() => setShowEpisodesModal(true)} />
        <Info.MetaInfo />
        <DescriptionComponent description={data.description} />
      </ScrollView>
      <EpisodesModal
        episodes={data.episodes}
        visible={showEpisodesModal}
        setVisible={setShowEpisodesModal}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
