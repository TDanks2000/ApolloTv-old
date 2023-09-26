import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';

interface Props {
  icon: string;
  currentTime: number;
  duration: number;
  isBuffering: boolean;

  videoRef: any;
}

const SkipTo = ({
  icon,
  duration,
  videoRef,
  currentTime,
  isBuffering,
}: Props) => {
  const [shouldDebounce, setShouldDebounce] = React.useState<boolean>(false);

  const onPress = () => {
    videoRef.current.seek(currentTime + duration);
  };

  return (
    <Button onPress={onPress} disabled={isBuffering}>
      <ButtonIcon name={icon} />
    </Button>
  );
};

export default SkipTo;
