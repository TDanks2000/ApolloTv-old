import {Button, ButtonIcon} from '../Controls.styles';
import {Buffering} from './PlayPause.styles';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  handleInactive: () => void;
  isBuffering: boolean;
}

const PlayPause = ({paused, setPaused, handleInactive, isBuffering}: Props) => {
  const onPress = () => {
    setPaused(!paused);
    if (paused) handleInactive();
  };

  if (isBuffering)
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
