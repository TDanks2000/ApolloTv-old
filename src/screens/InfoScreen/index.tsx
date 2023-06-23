import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen = ({route}: Props) => {
  const navigate: any = useNavigation();
  const {id} = route.params;

  useEffect(() => {
    if (!id) return navigate.navigate('Home');
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default InfoScreen;
