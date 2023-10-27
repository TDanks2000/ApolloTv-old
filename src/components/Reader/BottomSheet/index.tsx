import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackground from './CustomBackground';
import Handle from './CustomHandle';
import BottomSheetSettings from './BottomSheetSettings';
import {HorizontalType, LayoutMode} from '../../../@types';

type Props = {
  bottomSheetRef: React.Ref<BottomSheet>;
  layoutMode: LayoutMode;
  setLayoutMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
  horizontalType: HorizontalType;
  setHorizontalType: React.Dispatch<React.SetStateAction<HorizontalType>>;
};

const ReaderBottomSheet: React.FC<Props> = ({
  bottomSheetRef,
  layoutMode,
  setLayoutMode,
  horizontalType,
  setHorizontalType,
}) => {
  const snapPoints = React.useMemo(() => ['25%', '55%'], []);
  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      ref={bottomSheetRef}
      backgroundComponent={CustomBackground}
      handleComponent={Handle}>
      <BottomSheetSettings
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        horizontalType={horizontalType}
        setHorizontalType={setHorizontalType}
      />
    </BottomSheet>
  );
};

export default ReaderBottomSheet;
