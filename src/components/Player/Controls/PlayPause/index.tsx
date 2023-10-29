import {Button, ButtonIcon} from '../Controls.styles';
import {Buffering} from './PlayPause.styles';

interface Props {
  togglePlayPause: () => void;
  handleInactive: () => void;
  paused: boolean;
  buffering: boolean;
}

const PlayPause = ({
  handleInactive,
  togglePlayPause,
  paused,
  buffering,
}: Props) => {
  const onPress = () => {
    togglePlayPause();
    if (paused) handleInactive();
  };

  if (buffering)
    return (
      <Button disabled>
        <Buffering />
      </Button>
    );

  return (
    <Button onPress={onPress}>
      <ButtonIcon name={paused ? 'play' : 'pause'} />
    </Button>
  );
};

export default PlayPause;
