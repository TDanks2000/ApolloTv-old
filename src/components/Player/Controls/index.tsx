import {View, Text} from 'react-native';
import React from 'react';
import {
  Bottom,
  ClickToDismiss,
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
import {episodeSQLHelper} from '../../../utils/database';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  videoRef: any;
  currentTime: number;
  duration: number;

  episode_info: EpisodeInfo;
  anime_info: AnimeInfo;

  updateDB: () => void;
}

const PlayerControls = ({
  paused,
  setPaused,
  videoRef,
  currentTime,
  duration,
  episode_info,
  anime_info,
  updateDB,
}: Props) => {
  const [hideControls, setHideControls] = React.useState<boolean>(false);
  const actualTitle = utils.getTitle(anime_info.title);

  let hideControlsDuration: number = 5000;
  let hideControlsTimeout: number;
  const handleInactive = async () => {
    await updateDB();
    setHideControls((prev: boolean) => !prev);

    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      if (paused) return;
      setHideControls(true);
    }, hideControlsDuration);
  };

  return (
    <>
      <Container shouldShow={hideControls}>
        <ClickToDismiss onPress={handleInactive} />
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
          <PlayPause
            paused={paused}
            setPaused={setPaused}
            handleInactive={handleInactive}
          />
          <SkipTo icon="forward" duration={30} />
        </Middle>
        {/* @ts-ignore */}
        <Bottom>
          <ControlsSlider
            currentTime={currentTime}
            duration={duration}
            setPaused={setPaused}
            videoRef={videoRef}
            updateDB={updateDB}
          />
        </Bottom>
      </Container>
    </>
  );
};

export default PlayerControls;
