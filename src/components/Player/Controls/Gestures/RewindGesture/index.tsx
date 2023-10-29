import React from 'react';
import {Wrapper} from './RewindGesture.styles';
import TapGesture from '../TapGesture';

type Props = {
  handleInactive: () => void;
  currentTime: number;
  buffering: boolean;

  shouldShow: boolean;
  time: number;
  seekTo: (time: number) => void;
};

const RewindGesture: React.FC<Props> = ({
  handleInactive,
  currentTime,
  shouldShow,
  time,
  seekTo,
  buffering,
}) => {
  const onGesture = () => {
    if (buffering) return;
    seekTo(currentTime + parseInt(`-${time}`));
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
