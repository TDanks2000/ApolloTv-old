import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ResizeOptions,
  RootStackParamList,
  SourceVideoOptions,
  StackNavigation,
} from '../../@types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NavigationContext,
  SettingsContext,
  useAccessToken,
} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {fetcher} from './helpers/fetcher';
import {useQuery} from '@tanstack/react-query';
import {useCallback, useContext, useMemo, useRef, useState} from 'react';
import Video, {
  LoadError,
  OnBufferData,
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from 'react-native-video';
import {
  PanResponder,
  PanResponderInstance,
  PanResponderStatic,
  Pressable,
  StatusBar,
} from 'react-native';
import {Container} from './VideoPlayerScreen.styles';
import {helpers} from '../../utils';
import {LANDSCAPE, OrientationLocker} from 'react-native-orientation-locker';
import {MiddleOfScreenLoadingComponent, Player} from '../../components';
import Toast from 'react-native-toast-message';
import {checkIfWatchedFromDB, createAndUpdateDB, updateDB} from './helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

interface IPlayer {
  controlTimeout: NodeJS.Timeout | null;
  controlTimeoutTime: number;
  tapActionTimeout: NodeJS.Timeout | null;
  volumePanResponder: React.MutableRefObject<PanResponderStatic>;
  seekPanResponder: React.MutableRefObject<PanResponderStatic>;
  ref: React.RefObject<Video>;
  [x: string]: any;
}

const VideoPlayerScreen: React.FC<Props> = ({route}) => {
  // navigation
  const navigation = useNavigation<StackNavigation>();
  // access token
  const {accessToken} = useAccessToken();
  // anilist wrapper
  const anilist = new Anilist(accessToken);

  // Settings
  const {
    autoSkipOutro,
    autoSkipIntro,
    changeAutoSkip,
    autoNextEpisode,
    changeAutoNextEpisode,
    privateMode,
    preferedQuality,
    sourceProvider,
    preferedVoice,
    playInBackground,
    playWhenInactive,
  } = useContext(SettingsContext);

  // show nav bar
  const {setShowNavBar} = useContext(NavigationContext);

  // props sent from route
  const {
    episode_id,
    episode_info,
    source_provider,
    anime_info,
    next_episode_id,
    watched_percentage,
    episodes,
  } = route.params;

  // fetch video links
  const {
    isPending,
    isError,
    data,
    error,
    refetch: refetchVideoData,
  } = useQuery({
    queryKey: ['VideoPlayer', episode_id, sourceProvider],
    queryFn: () =>
      fetcher(
        episode_id,
        sourceProvider ?? 'gogoanime',
        preferedVoice ?? 'sub',
      ),
  });

  // state
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [rate, setRate] = useState(0);

  // watched states
  const [watched, setWatched] = useState(false);

  const [volumeTrackWidth, setVolumeTrackWidth] = useState(0);
  const [volumeFillWidth, setVolumeFillWidth] = useState(0);
  const [seekerFillWidth, setSeekerFillWidth] = useState(0);
  const [volumePosition, setVolumePosition] = useState(0);
  const [seekerPosition, setSeekerPosition] = useState(0);
  const [volumeOffset, setVolumeOffset] = useState(0);
  const [seekerOffset, setSeekerOffset] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [originallyPaused, setOriginallyPaused] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [resizeMode, setResizeMode] = useState<ResizeOptions>('contain');
  const [selectedSource, setSelectedSource] = useState<
    SourceVideoOptions | undefined
  >(undefined);

  // player
  const player: IPlayer = {
    controlTimeoutDelay: 130,
    volumePanResponder: useRef<PanResponder>(PanResponder),
    seekPanResponder: useRef<PanResponder>(PanResponder),
    controlTimeout: null,
    controlTimeoutTime: 7000,
    tapActionTimeout: null,
    ref: useRef<Video>(null),
    scrubbingTimeStep: scrubbing,
    // tapAnywhereToPause,
  };

  // on load start event
  const onLoadStart = () => {
    setLoading(true);
  };

  // on load event
  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setLoading(false);

    if (showControls) {
      setControlTimeout();
    }
  };

  // on progress event
  const onProgress = (data: OnProgressData) => {
    if (!scrubbing) {
      setCurrentTime(data.currentTime);
    }
  };

  // on seek event
  const onSeek = (data: OnSeekData) => {
    if (scrubbing) {
      setScrubbing(false);
      setCurrentTime(data.currentTime);
      updateDB(
        currentTime,
        duration,
        parseInt(anime_info.id),
        episode_info,
        data.currentTime,
      );
    }
  };

  // on end event
  const onEnd = () => {};

  // error event
  const onError = (err: LoadError) => {
    if (setShowNavBar) setShowNavBar(true);
  };

  // on buffering event
  const onBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
  };

  // on screen touch event
  const onScreenTouch = () => {
    clearTimeout(player.controlTimeout!);
    setShowControls(prev => !prev);

    player.controlTimeout = setTimeout(() => {
      // if (wantUpdate)
      //   updateDB(currentTime, duration, parseInt(anime_info.id), episode_info);
      if (paused) return;
      setShowControls(true);
    }, player.controlTimeoutTime);

    // if (spinState) startSpinAnimation();
  };

  // set control timeout
  const setControlTimeout = () => {
    player.controlTimeout = setTimeout(() => {
      hideControls();
    }, player.controlTimeoutDelay);
  };

  // clear control timeout
  const clearControlTimeout = () => {
    if (player.controlTimeout) clearTimeout(player.controlTimeout);
  };

  // reset control timer
  const resetControlTimeout = () => {
    clearControlTimeout();
    setControlTimeout();
  };

  // hide controls
  const hideControls = () => {
    setShowControls(false);
  };

  // toggle controls
  const toggleControls = () => {
    setShowControls(prev => !prev);

    if (showControls) {
      // showControlAnimation();
      setControlTimeout();
    } else {
      // hideControlAnimation();
      clearControlTimeout();
    }
  };

  // toggle play pause
  const togglePlayPause = () => {
    setPaused(prev => !prev);

    updateDB(
      currentTime,
      duration,
      parseInt(anime_info.id),
      episode_info,
      currentTime,
    );
  };

  // Seek to
  const seekTo = (time: number) => {
    setCurrentTime(time);
    player.ref.current?.seek(time);
  };

  // user agent
  const USER_AGENT = useMemo(
    () =>
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    [],
  );

  // referer
  const referer = useMemo(() => data?.headers?.Referer ?? undefined, [data]);

  // sources
  const sources: SourceVideoOptions[] = data?.sources ?? data;

  // find the highest quality or prefered quality (if setting is set)
  const findHighestQuality = helpers.findQuality(sources, preferedQuality);

  useFocusEffect(
    useCallback(() => {
      if (setShowNavBar) setShowNavBar(false);
      if (!data) return;
      setSelectedSource(findHighestQuality);
      // createAndUpdateDB();
      // checkIfWatchedFromDB();

      if (isError && setShowNavBar) {
        setShowNavBar(true);
      }
    }, [data, isError, error, duration, episode_info]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!data) return;
      createAndUpdateDB(anime_info, episode_info, next_episode_id);
      checkIfWatchedFromDB(anime_info, episode_info, setWatched);
    }, [data, isError, error, currentTime, duration, episode_info]),
  );

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (isError || error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message ?? 'Something went wrong',
    });
  }

  if (!selectedSource) return <MiddleOfScreenLoadingComponent />;

  return (
    <>
      <OrientationLocker orientation={LANDSCAPE} />
      <StatusBar hidden={true} />
      <Player.PlayerControls
        anime_info={anime_info}
        episode_info={episode_info}
        episodes={episodes}
        resizeMode={resizeMode}
        setResizeMode={setResizeMode}
        selectedQuality={selectedSource!}
        setSelectedQuality={setSelectedSource}
        sources={sources}
        resetControlTimeout={resetControlTimeout}
        showControls={showControls}
        onScreenTouch={onScreenTouch}
        seekTo={seekTo}
        currentTime={currentTime}
        duration={duration}
        paused={paused}
        togglePlayPause={togglePlayPause}
        setPaused={setPaused}
        buffering={buffering}
        setScrubbing={setScrubbing}
      />
      <Video
        ref={player.ref}
        resizeMode={resizeMode}
        volume={volume}
        paused={paused}
        muted={muted}
        rate={rate}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onError={onError}
        onLoad={onLoad}
        onEnd={onEnd}
        onSeek={onSeek}
        onBuffer={onBuffer}
        source={{
          uri: selectedSource.url,
          headers: {
            'User-Agent': USER_AGENT,
            Referer: referer,
          },
        }}
        playInBackground={playInBackground === 'off' ? false : true}
        playWhenInactive={playWhenInactive === 'off' ? false : true}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      />
    </>
  );
};

export default VideoPlayerScreen;
