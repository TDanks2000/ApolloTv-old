import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {
  Bottom,
  ClickToDismiss,
  Container,
  Middle,
  SettingsCog,
  Top,
  TopRight,
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
import Settings from './Settings';

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
  const [spinState, setSpillegalnState] = React.useState<boolean>(false);
  const spinValue = React.useRef(new Animated.Value(0)).current;

  const startSpinAnimation = () => {
    setSpillegalnState((prev: boolean) => !prev);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start(() => {
      // Reset the spin value after the animation is complete
      spinValue.setValue(0);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: !spinState ? ['180deg', '0deg'] : ['0deg', '180deg'],
  });

  let hideControlsDuration: number = 7000;
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
          <TopRight>
            <TouchableOpacity onPress={startSpinAnimation}>
              <Animated.View style={{transform: [{rotate: spin}]}}>
                <SettingsCog name="cog" />
              </Animated.View>
            </TouchableOpacity>
            <Settings shouldOpen={spinState} />
          </TopRight>
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
