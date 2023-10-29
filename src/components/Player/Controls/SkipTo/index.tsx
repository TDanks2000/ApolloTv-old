import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';

interface Props {
  icon: string;
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;
  buffering: boolean;
}

const SkipTo = ({icon, duration, currentTime, seekTo, buffering}: Props) => {
  // const [shouldDebounce, setShouldDebounce] = React.useState<boolean>(false);

  const onPress = () => {
    if (buffering) return;
    seekTo(currentTime + duration);
  };

  return (
    <Button onPress={onPress}>
      <ButtonIcon name={icon} />
    </Button>
  );
};

export default SkipTo;
