import {ScrollView} from 'react-native';
import React from 'react';
import {Container, SettingTitle} from './BottomSheetSettings.styles';
import {Text} from '../../../../styles/sharedStyles';
import ReadingMode from './ReadingMode';
import ScreenOrientation from './ScreenOrientation';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const BottomSheetSettings = () => {
  return (
    <BottomSheetScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <Container>
        <ReadingMode />
        <ScreenOrientation />
      </Container>
    </BottomSheetScrollView>
  );
};

export default BottomSheetSettings;
