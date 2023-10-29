// React and React Native imports
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';

// Styled components imports
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
  Wrapper,
} from './Controls.styles';

// Types imports
import {
  AnimeInfo,
  Aniskip,
  EpisodeInfo,
  ResizeOptions,
  SettingsOptionsGroup,
  SourceVideoOptions,
} from '../../../@types';

// Utilities imports
import {helpers, utils} from '../../../utils';

// Modals imports
import {VideoEpisodesModal, VideoSettingsModal} from '../../../modals';

// Controls components imports
import PlayPause from './PlayPause';
import SkipTo from './SkipTo';
import ControlsSlider from './Slider';

// Shared components imports
import {BackButtonComponent} from '../../Shared';

import {UPDATEDB} from '../../../screens/VideoPlayerScreen/helpers';
import RewindGesture from './Gestures/RewindGesture';
import ForwardGesture from './Gestures/ForwardGesture';
import {isStringNullOrEmpty} from '../../../utils/utils';
import {SettingsContext} from '../../../contexts';
import Skip85 from './Skip85';

interface Props {
  // time state props
  currentTime: number;
  duration: number;
  paused: boolean;

  // seek to prop
  seekTo: (time: number) => void;

  // anime info prop
  anime_info: AnimeInfo;

  // episode info prop
  episode_info: EpisodeInfo;

  // episodes array prop
  episodes: EpisodeInfo[];

  // resize mode state props
  resizeMode: ResizeOptions;
  setResizeMode: (resizeMode: ResizeOptions) => void;

  // quality props
  selectedQuality: SourceVideoOptions;
  setSelectedQuality: (quality: SourceVideoOptions) => void;
  sources: SourceVideoOptions[];

  resetControlTimeout: () => void;
  showControls: boolean;
  onScreenTouch: () => void;

  togglePlayPause: () => void;
  setPaused: (paused: boolean) => void;
  buffering: boolean;
  setScrubbing: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerControls = ({
  anime_info,
  episode_info,
  episodes,
  resizeMode,
  selectedQuality,
  setResizeMode,
  setSelectedQuality,
  sources,
  resetControlTimeout,
  showControls,
  onScreenTouch,
  currentTime,
  duration,
  seekTo,
  togglePlayPause,
  paused,
  setPaused,
  buffering,
  setScrubbing,
}: Props) => {
  const actualTitle = utils.getTitle(anime_info.title);

  const [spinValue] = useState(new Animated.Value(0));
  const [openSettings, setOpenSettings] = useState(false);
  const [openEpisodes, setOpenEpisodes] = useState(false);
  const [isAtIntro, setIsAtIntro] = useState(false);
  const [isAtOutro, setIsAtOutro] = useState(false);

  const [spinState, setSpinState] = React.useState<boolean>(false);

  const {skipBehindTime, skipForwardTime} = React.useContext(SettingsContext);

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

  // let hideControlsDuration: number = 7000;
  // let hideControlsTimeout: NodeJS.Timeout;

  // const handleInactive = (wantUpdate = true) => {
  //   clearTimeout(hideControlsTimeout);
  //   setHideControls(!hideControls);

  //   hideControlsTimeout = setTimeout(() => {
  //     if (wantUpdate)
  //       updateDB(currentTime, duration, parseInt(anime_info.id), episode_info);
  //     if (paused) return;
  //     setHideControls(true);
  //   }, hideControlsDuration);

  //   if (spinState) startSpinAnimation();
  // };

  const isQualityANumber = (quality: any) => {
    return parseInt(quality) > 1;
  };

  const sourcesSorted = helpers.sortQualities(sources as any);
  const qualityOptions: SettingsOptionsGroup = {
    title: 'Quality',
    options: sourcesSorted.map(source => ({
      title: isQualityANumber(source.quality)
        ? source.quality?.replace(/\D/g, '') + 'P' || ''
        : source.quality.toUpperCase() ?? '',
      value: isQualityANumber(source.quality)
        ? source.quality?.replace(/\D/g, '') + 'P' || ''
        : source.quality.toUpperCase() ?? '',
      onPress: () => {
        if (source.quality !== selectedQuality.quality) {
          setSelectedQuality({
            quality: source?.quality?.replace(/\D/g, '') + 'P' || '',
            url: source?.url,
            isM3U8: source?.isM3U8,
          });
        }
        // handleInactive(false);
        // setTimeout(checkIfWatched, 500);
      },
    })),
  };

  // const timeToCheckBefore = 5;
  // const checkPosition = (
  //   startTime: number,
  //   endTime: number,
  //   positionTime: number,
  // ): boolean => {
  //   return positionTime >= startTime && positionTime <= endTime;
  // };

  // const handleSkipTimeCheck = () => {
  //   // if (skipTimes?.opening) {
  //   //   const openingStartTime =
  //   //     skipTimes.opening.interval.startTime - timeToCheckBefore;
  //   //   const openingEndTime = skipTimes.opening?.interval?.endTime;
  //   //   setIsAtIntro(
  //   //     checkPosition(openingStartTime, openingEndTime, currentTime) &&
  //   //       !isAtIntro,
  //   //   );
  //   //   setIsAtOutro(!isAtIntro && currentTime >= openingEndTime);
  //   // }
  //   // if (skipTimes?.ending) {
  //   //   const endingStartTime =
  //   //     skipTimes.ending.interval.startTime - timeToCheckBefore;
  //   //   const endingEndTime = skipTimes.ending?.interval?.endTime;
  //   //   // setIsAtOutro(
  //   //   //   checkPosition(endingStartTime, endingEndTime, currentTime) &&
  //   //   //     !isAtOutro,
  //   //   // );
  //   //   // setIsAtIntro(!isAtOutro && currentTime >= endingEndTime);
  //   // }
  // };

  // useEffect(() => {
  //   handleSkipTimeCheck();
  // }, [currentTime]);

  return (
    <Wrapper>
      <RewindGesture
        handleInactive={onScreenTouch}
        currentTime={currentTime}
        buffering={buffering}
        shouldShow={showControls}
        time={skipBehindTime ?? 30}
        seekTo={seekTo}
      />

      <ForwardGesture
        handleInactive={onScreenTouch}
        currentTime={currentTime}
        buffering={buffering}
        shouldShow={showControls}
        time={skipForwardTime ?? 30}
        seekTo={seekTo}
      />

      <Container shouldShow={showControls}>
        <ClickToDismiss onPress={() => onScreenTouch()} />
        {/* @ts-ignore */}
        <Top hidden={showControls}>
          <BackButtonComponent isModal={false} />
          <TopTextContainer>
            <TopText numberOfLines={1} weight="bold">
              {actualTitle}
            </TopText>
            <TopText numberOfLines={1}>
              {isStringNullOrEmpty(episode_info.title) ? (
                `Episode ${episode_info.episode_number}`
              ) : (
                <>
                  {episode_info.episode_number} - {episode_info.title}
                </>
              )}
            </TopText>
          </TopTextContainer>
          <TopRight>
            <View>
              <TouchableOpacity onPress={() => setOpenEpisodes(true)}>
                <IconBase6 name="rectangle-list" />
              </TouchableOpacity>
              <VideoEpisodesModal
                episodes={episodes}
                anime_info={anime_info}
                visible={openEpisodes}
                onClose={() => {}}
                closeFunction={() => setOpenEpisodes(false)}
                currentEpisode={episode_info.episode_number ?? 1}
              />
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
                resizeMode={resizeMode}
                setResizeMode={setResizeMode}
              />
            </View>
          </TopRight>
        </Top>
        <Middle hidden={showControls}>
          <SkipTo
            icon="backward"
            duration={parseInt(`-${skipBehindTime}`) ?? -30}
            currentTime={currentTime}
            seekTo={seekTo}
            buffering={buffering}
          />
          <PlayPause
            paused={paused}
            togglePlayPause={togglePlayPause}
            handleInactive={onScreenTouch}
            buffering={buffering}
          />
          <SkipTo
            icon="forward"
            duration={skipForwardTime ?? 30}
            currentTime={currentTime}
            seekTo={seekTo}
            buffering={buffering}
          />
        </Middle>
        {/* @ts-ignore */}
        <Bottom hidden={showControls}>
          <ControlsSlider
            currentTime={currentTime}
            duration={duration}
            setPaused={setPaused}
            seekTo={seekTo}
            setScrubbing={setScrubbing}
          />
        </Bottom>
      </Container>
    </Wrapper>
  );
};

export default PlayerControls;
