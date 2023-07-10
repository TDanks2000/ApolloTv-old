import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';

interface Props {
  icon: string;
  currentTime: number;
  duration: number;
  isBuffering: boolean;

  videoRef: any;
  updateDb: () => void;
}

const SkipTo = ({
  icon,
  duration,
  videoRef,
  currentTime,
  updateDb,
  isBuffering,
}: Props) => {
  const [shouldDebounce, setShouldDebounce] = React.useState<boolean>(false);

  const onPress = () => {
    videoRef.current.seek(currentTime + duration);
    setShouldDebounce(true);
  };

  React.useEffect(() => {
    if (!shouldDebounce) return;

    const debounceTimer = setTimeout(() => {
      updateDb();
      console.log('updated time in db');
      setShouldDebounce(false);
    }, 1500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [shouldDebounce, currentTime]);

  return (
    <Button onPress={onPress} disabled={isBuffering}>
      <ButtonIcon name={icon} />
    </Button>
  );
};

export default SkipTo;
