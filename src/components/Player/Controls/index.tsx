import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {
  Bottom,
  ClickToDismiss,
  Container,
  Middle,
  IconBase,
  Top,
  TopRight,
  TopText,
  TopTextContainer,
  IconBase6,
} from './Controls.styles';
import PlayPause from './PlayPause';
import SkipTo from './SkipTo';
import {BackButtonComponent} from '../../Shared';
import ControlsSlider from './Slider';
import {
  AnimeInfo,
  EpisodeInfo,
  SettingsOptionsGroup,
  SourceVideoOptions,
} from '../../../@types';
import {utils} from '../../../utils';
import {episodeSQLHelper} from '../../../utils/database';

import {VideoEpisodesModal, VideoSettingsModal} from '../../../modals';

interface Props {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  videoRef: any;
  currentTime: number;
  duration: number;
  isBuffering: boolean;

  episode_info: EpisodeInfo;
  anime_info: AnimeInfo;

  updateDB: () => void;

  selectedQuality: SourceVideoOptions;
  setSelectedQuality: (quality: SourceVideoOptions) => void;
  sources: SourceVideoOptions[];
  checkIfWatched: () => void;
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
  selectedQuality,
  sources,
  setSelectedQuality,
  checkIfWatched,
  isBuffering,
}: Props) => {
  const [hideControls, setHideControls] = React.useState<boolean>(false);
  const actualTitle = utils.getTitle(anime_info.title);
  const [spinState, setSpinState] = React.useState<boolean>(false);
  const spinValue = React.useRef(new Animated.Value(0)).current;

  const [openSettings, setOpenSettings] = React.useState<boolean>(false);

  const startSpinAnimation = () => {
    setSpinState((prev: boolean) => !prev);
    setOpenSettings((prev: boolean) => !prev);

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
  let hideControlsTimeout: any;
  const handleInactive = (wantUpdate: boolean = true) => {
    if (wantUpdate) updateDB();
    setHideControls((prev: boolean) => !prev);

    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      if (paused) return;
      setHideControls(true);
    }, hideControlsDuration);

    if (spinState) startSpinAnimation();
  };

  const sourcesSorted = utils.sortQualities(sources as any);
  const qualityOptions: SettingsOptionsGroup = {
    title: 'Quality',
    options: sourcesSorted.map((source: SourceVideoOptions) => ({
      title: source.quality ?? undefined,
      value: source.quality?.toLowerCase(),
      onPress: () => {
        if (source.quality !== selectedQuality.quality)
          setSelectedQuality(source);
        handleInactive(false);
        setTimeout(() => {
          checkIfWatched();
        }, 500);
      },
    })),
  };

  return (
    <>
      <Container shouldShow={hideControls}>
        <ClickToDismiss onPress={() => handleInactive()} />
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
            <View>
              <TouchableOpacity>
                <IconBase6 name="rectangle-list" />
              </TouchableOpacity>
              <VideoEpisodesModal />
            </View>
            <View>
              <TouchableOpacity onPress={startSpinAnimation}>
                <Animated.View style={{transform: [{rotate: spin}]}}>
                  <IconBase name="cog" />
                </Animated.View>
              </TouchableOpacity>
              <VideoSettingsModal
                shouldOpen={openSettings}
                closeFunction={startSpinAnimation}
                selectedQuality={selectedQuality}
                options={[qualityOptions]}
              />
            </View>
          </TopRight>
        </Top>
        <Middle>
          <SkipTo
            icon="backward"
            duration={-30}
            videoRef={videoRef}
            currentTime={currentTime}
            updateDb={updateDB}
            isBuffering={isBuffering}
          />
          <PlayPause
            paused={paused}
            setPaused={setPaused}
            handleInactive={handleInactive}
            isBuffering={isBuffering}
          />
          <SkipTo
            icon="forward"
            duration={30}
            videoRef={videoRef}
            currentTime={currentTime}
            updateDb={updateDB}
            isBuffering={isBuffering}
          />
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
