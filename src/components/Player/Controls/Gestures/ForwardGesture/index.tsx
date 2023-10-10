import {View, Text, Animated} from 'react-native';
import React from 'react';
import {Wrapper} from './ForwardGesture.styles';
import TapGesture from '../TapGesture';

type Props = {
  handleInactive: () => void;
  currentTime: number;
  isBuffering: boolean;
  videoRef: any;

  shouldShow: boolean;
};

const ForwardGesture: React.FC<Props> = ({
  handleInactive,
  currentTime,
  isBuffering,
  videoRef,
  shouldShow,
}) => {
  const onGesture = () => {
    if (isBuffering) return;
    videoRef.current.seek(currentTime + 30);
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

export default ForwardGesture;
