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
  paused: boolean;
  setPaused: (paused: boolean) => void;
  videoRef: any;
  currentTime: number;
  setCurrentTime: (number: number) => void;
  duration: number;
  isBuffering: boolean;

  updateDB: UPDATEDB;

  episode_info: EpisodeInfo;
  anime_info: AnimeInfo;

  selectedQuality: SourceVideoOptions;
  setSelectedQuality: (quality: SourceVideoOptions) => void;
  sources: SourceVideoOptions[];
  checkIfWatched: () => void;

  skipTimes: {opening?: Aniskip; ending?: Aniskip} | undefined;
  skipFunctions: {
    skipIntro: () => void;
    skipOutro: () => void;
  };
  episodes: EpisodeInfo[];
}

const PlayerControls = ({
  paused,
  setPaused,
  videoRef,
  currentTime,
  duration,
  episode_info,
  anime_info,
  selectedQuality,
  sources,
  setSelectedQuality,
  checkIfWatched,
  isBuffering,
  skipFunctions,
  skipTimes,
  episodes,
  updateDB,
  setCurrentTime,
}: Props) => {
  const actualTitle = utils.getTitle(anime_info.title);

  const [spinValue] = useState(new Animated.Value(0));
  const [hideControls, setHideControls] = useState(false);
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

  let hideControlsDuration: number = 7000;
  let hideControlsTimeout: NodeJS.Timeout;

  const handleInactive = (wantUpdate = true) => {
    clearTimeout(hideControlsTimeout);
    setHideControls(!hideControls);

    hideControlsTimeout = setTimeout(() => {
      if (wantUpdate)
        updateDB(currentTime, duration, parseInt(anime_info.id), episode_info);
      if (paused) return;
      setHideControls(true);
    }, hideControlsDuration);

    if (spinState) startSpinAnimation();
  };

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
        handleInactive(false);
        setTimeout(checkIfWatched, 500);
      },
    })),
  };

  const timeToCheckBefore = 5;
  const checkPosition = (
    startTime: number,
    endTime: number,
    positionTime: number,
  ): boolean => {
    return positionTime >= startTime && positionTime <= endTime;
  };

  const handleSkipTimeCheck = () => {
    // if (skipTimes?.opening) {
    //   const openingStartTime =
    //     skipTimes.opening.interval.startTime - timeToCheckBefore;
    //   const openingEndTime = skipTimes.opening?.interval?.endTime;
    //   setIsAtIntro(
    //     checkPosition(openingStartTime, openingEndTime, currentTime) &&
    //       !isAtIntro,
    //   );
    //   setIsAtOutro(!isAtIntro && currentTime >= openingEndTime);
    // }
    // if (skipTimes?.ending) {
    //   const endingStartTime =
    //     skipTimes.ending.interval.startTime - timeToCheckBefore;
    //   const endingEndTime = skipTimes.ending?.interval?.endTime;
    //   // setIsAtOutro(
    //   //   checkPosition(endingStartTime, endingEndTime, currentTime) &&
    //   //     !isAtOutro,
    //   // );
    //   // setIsAtIntro(!isAtOutro && currentTime >= endingEndTime);
    // }
  };

  useEffect(() => {
    handleSkipTimeCheck();
  }, [currentTime]);

  return (
    <Wrapper>
      <RewindGesture
        handleInactive={handleInactive}
        videoRef={videoRef}
        currentTime={currentTime}
        isBuffering={isBuffering}
        shouldShow={hideControls}
        time={skipBehindTime ?? 30}
      />

      <ForwardGesture
        handleInactive={handleInactive}
        videoRef={videoRef}
        currentTime={currentTime}
        isBuffering={isBuffering}
        shouldShow={hideControls}
        time={skipForwardTime ?? 30}
      />

      <Container shouldShow={hideControls}>
        <ClickToDismiss onPress={() => handleInactive()} />

        <Skip85
          videoRef={videoRef}
          opSkipTimes={skipTimes?.opening}
          edSkipTimes={skipTimes?.ending}
          currentTime={currentTime}
          duration={duration}
        />

        {/* @ts-ignore */}
        <Top hidden={hideControls}>
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
              />
            </View>
          </TopRight>
        </Top>
        <Middle hidden={hideControls}>
          <SkipTo
            icon="backward"
            duration={parseInt(`-${skipBehindTime}`) ?? -30}
            videoRef={videoRef}
            currentTime={currentTime}
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
            duration={skipForwardTime ?? 30}
            videoRef={videoRef}
            currentTime={currentTime}
            isBuffering={isBuffering}
          />
        </Middle>
        {/* @ts-ignore */}
        <Bottom hidden={hideControls}>
          <ControlsSlider
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            setPaused={setPaused}
            videoRef={videoRef}
          />
        </Bottom>
      </Container>
      {/* {isAtOutro ? (
        <SkipIntroOutro
          isHidden={hideControls}
          duration={5000}
          title="Skip Outro"
          type="skip_outro"
          skipFunctions={skipFunctions}
        />
      ) : isAtIntro ? (
        <SkipIntroOutro
          isHidden={hideControls}
          duration={5000}
          title="Skip Intro"
          type="skip_intro"
          skipFunctions={skipFunctions}
        />
      ) : null} */}
    </Wrapper>
  );
};

export default PlayerControls;
