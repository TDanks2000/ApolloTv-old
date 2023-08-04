import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Info, MangaInfo} from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaInfo'>;

const MangaInfoScreen: React.FC<Props> = ({route, navigation}) => {
  const params = route?.params;
  const {id} = params;
  return (
    <SafeAreaView>
      <Info.Top
        type="MANGA"
        poster_image="https://s4.anilist.co/file/anilistcdn/media/manga/banner/30013-hbbRZqC5MjYh.jpg"
        rating={91}
        title={'ONE PIECE'}
      />

      <MangaInfo.Options />
    </SafeAreaView>
  );
};

export default MangaInfoScreen;
