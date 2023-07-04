import {View, Text} from 'react-native';
import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';
import {episodeSQLHelper} from '../../../../utils/database';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  handleInactive: () => void;
}

const PlayPause = ({paused, setPaused, handleInactive}: Props) => {
  const onPress = () => {
    setPaused(!paused);
    if (paused) handleInactive();
  };

  return (
    <Button onPress={onPress}>
      <ButtonIcon name={paused ? 'play' : 'pause'} />
    </Button>
  );
};

export default PlayPause;
