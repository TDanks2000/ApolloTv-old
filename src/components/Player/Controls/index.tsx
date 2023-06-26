import {View, Text} from 'react-native';
import React from 'react';
import {
  Bottom,
  Container,
  Middle,
  Top,
  TopText,
  TopTextContainer,
} from './Controls.styles';
import PlayPause from './PlayPause';
import SkipTo from './SkipTo';
import {BackButtonComponent} from '../../Shared';
import ControlsSlider from './Slider';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  videoRef: any;
  currentTime: number;
  duration: number;
}

const PlayerControls = ({
  paused,
  setPaused,
  videoRef,
  currentTime,
  duration,
}: Props) => {
  return (
    <Container>
      {/* @ts-ignore */}
      <Top>
        <BackButtonComponent isModal={true} />
        <TopTextContainer>
          <TopText numberOfLines={1} weight="bold">
            One Piece
          </TopText>
          <TopText numberOfLines={1}>
            01 - I'm Luffy! The Man Who Will Become the Pirate King!
          </TopText>
        </TopTextContainer>
      </Top>
      <Middle>
        <SkipTo icon="backward" duration={30} />
        <PlayPause paused={paused} setPaused={setPaused} />
        <SkipTo icon="forward" duration={30} />
      </Middle>
      {/* @ts-ignore */}
      <Bottom>
        <ControlsSlider
          currentTime={currentTime}
          duration={duration}
          setPaused={setPaused}
          videoRef={videoRef}
        />
      </Bottom>
    </Container>
  );
};

export default PlayerControls;
