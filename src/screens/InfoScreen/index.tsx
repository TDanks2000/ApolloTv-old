import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info} from '../../components';
import {DescriptionComponent} from '../../components/Shared';
import {ScrollView} from '../../styles/sharedStyles';
import {EpisodesModal} from '../../modals';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
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
        <DescriptionComponent
          description={`The taxi driver Odokawa lives a very mundane life. He has no family, doesn't really hang out with others, and he's an oddball who is narrow-minded and doesn't talk much. The only people he can call his friends are his doctor, Gouriki and his classmate from high school, Kakihana.

All of his patrons seem to be slightly odd themselves. The college student who wants the world to notice him online, Kabasawa. A nurse with secrets named Shirakawa. A comedy duo that just can't catch a break named the Homosapiens. A local hoodlum named Dobu. An idol group that's just starting out named Mystery Kiss... All these mundane conversations somehow eventually lead to a girl who's gone missing.
        
(Source: Crunchyroll)`}
        />
      </ScrollView>
      <EpisodesModal
        episodes={[]}
        visible={showEpisodesModal}
        setVisible={setShowEpisodesModal}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
