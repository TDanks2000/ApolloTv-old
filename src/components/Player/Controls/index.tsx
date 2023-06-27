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
import {AnimeInfo, EpisodeInfo} from '../../../@types';
import {utils} from '../../../utils';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  videoRef: any;
  currentTime: number;
  duration: number;

  episode_info: EpisodeInfo;
  anime_info: AnimeInfo;
}

const PlayerControls = ({
  paused,
  setPaused,
  videoRef,
  currentTime,
  duration,
  episode_info,
  anime_info,
}: Props) => {
  const actualTitle = utils.getTitle(anime_info.title);

  return (
    <Container>
      {/* @ts-ignore */}
      <Top>
        <BackButtonComponent isModal={false} />
        <TopTextContainer>
          <TopText numberOfLines={1} weight="bold">
            {actualTitle}
          </TopText>
          <TopText numberOfLines={1}>
            {episode_info.episode_number} - {episode_info.title}
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
