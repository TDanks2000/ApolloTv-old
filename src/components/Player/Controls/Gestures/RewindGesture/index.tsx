import React from 'react';
import {Wrapper} from './RewindGesture.styles';
import TapGesture from '../TapGesture';

type Props = {
  handleInactive: () => void;
  currentTime: number;
  isBuffering: boolean;
  videoRef: any;

  shouldShow: boolean;
  time: number;
};

const RewindGesture: React.FC<Props> = ({
  handleInactive,
  currentTime,
  isBuffering,
  videoRef,
  shouldShow,
  time,
}) => {
  const onGesture = () => {
    if (isBuffering) return;
    videoRef.current.seek(currentTime + parseInt(`-${time}`));
  };

  if (!shouldShow) return null;
  return (
    <TapGesture
      numberOfTaps={2}
      tapFunction={onGesture}
      singleTapFunction={handleInactive}>
      <Wrapper />
    </TapGesture>
  );
};

export default RewindGesture;
