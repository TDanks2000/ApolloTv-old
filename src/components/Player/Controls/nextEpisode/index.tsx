import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';
import {EpisodeInfo} from '../../../../@types';

type Props = {
  type: 'next' | 'prev';
  icon: string;
  prev_episode?: EpisodeInfo;
  next_episode?: EpisodeInfo;
} & (
  | {
      type: 'next';
      next_episode: EpisodeInfo;
    }
  | {
      type: 'prev';
      prev_episode: EpisodeInfo;
    }
);

const NextEpisodeButton = ({icon, type, next_episode, prev_episode}: Props) => {
  // const [shouldDebounce, setShouldDebounce] = React.useState<boolean>(false);

  const onPress = () => {
    console.log('test');
  };

  return (
    <Button onPress={onPress}>
      <ButtonIcon name={icon} />
    </Button>
  );
};

export default NextEpisodeButton;
