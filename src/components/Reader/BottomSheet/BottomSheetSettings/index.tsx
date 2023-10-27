import {ScrollView} from 'react-native';
import React from 'react';
import {Container, SettingTitle} from './BottomSheetSettings.styles';
import {Text} from '../../../../styles/sharedStyles';
import ReadingMode from './ReadingMode';
import ScreenOrientation from './ScreenOrientation';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {HorizontalType, LayoutMode} from '../../../../@types';

type Props = {
  layoutMode: LayoutMode;
  setLayoutMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
  horizontalType: HorizontalType;
  setHorizontalType: React.Dispatch<React.SetStateAction<HorizontalType>>;
};

const BottomSheetSettings: React.FC<Props> = ({
  layoutMode,
  setLayoutMode,
  horizontalType,
  setHorizontalType,
}) => {
  return (
    <BottomSheetScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <Container>
        <ReadingMode
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          horizontalType={horizontalType}
          setHorizontalType={setHorizontalType}
        />
        <ScreenOrientation />
      </Container>
    </BottomSheetScrollView>
  );
};

export default BottomSheetSettings;
