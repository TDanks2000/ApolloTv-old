import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackground from './CustomBackground';
import Handle from './CustomHandle';
import BottomSheetSettings from './BottomSheetSettings';
import {HorizontalType, LayoutMode, OrientationType} from '../../../@types';

type Props = {
  bottomSheetRef: React.Ref<BottomSheet>;
};

const ReaderBottomSheet: React.FC<Props> = ({bottomSheetRef}) => {
  const snapPoints = React.useMemo(() => ['25%', '55%'], []);
  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      ref={bottomSheetRef}
      backgroundComponent={CustomBackground}
      handleComponent={Handle}>
      <BottomSheetSettings />
    </BottomSheet>
  );
};

export default ReaderBottomSheet;
