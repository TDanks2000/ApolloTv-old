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
import {fetchAniskip, fetcher} from './helpers/fetcher';
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
import {
  checkIfWatchedFromDB,
  createAndUpdateDB,
  updateAnilist,
  updateDB,
  watchTimeBeforeSync,
} from './helpers';
import {episodeSQLHelper} from '../../utils/database';

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

  // skip Data
  const [skipData, setSkipData] = useState<any>();
  const [skipDataPending, setSkipDataPending] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      fetchAniskip(anime_info, episode_info, setSkipData, setSkipDataPending);
    }, [episode_id, anime_info]),
  );

  // State variables for video playback controls
  const [paused, setPaused] = useState(false); // State for video pause status
  const [muted, setMuted] = useState(false); // State for video mute status
  const [volume, setVolume] = useState(100); // State for video volume level
  const [rate, setRate] = useState(0); // State for video playback rate

  // State variables for skipping intro and ending
  const [hasSkipedIntro, setHasSkippedIntro] = useState<boolean>(false); // State for whether the intro has been skipped
  const [hasSkipedEnding, setHasSkippedEnding] = useState<boolean>(false); // State for whether the ending has been skipped

  // State variable for watched status
  const [watched, setWatched] = useState<boolean>(false); // State for whether the video has been watched
  const [watchedAnilist, setWatchedAnilist] = useState<boolean>(false); // State for whether the video has been marked as watched on anilist

  // Other state variables related to video playback and UI controls
  const [scrubbing, setScrubbing] = useState(false); // State for whether scrubbing is in progress
  const [buffering, setBuffering] = useState(false); // State for whether buffering is in progress
  const [loading, setLoading] = useState(false); // State for whether loading is in progress

  // State variables related to video time and duration
  const [currentTime, setCurrentTime] = useState(0); // Current time of the video playback
  const [duration, setDuration] = useState(0); // Total duration of the video

  // Other state variables related to video player UI and source selection
  const [showControls, setShowControls] = useState(false); // State for whether to show video controls
  const [resizeMode, setResizeMode] = useState<ResizeOptions>('contain'); // Resize mode of the video player
  const [selectedSource, setSelectedSource] = useState<
    SourceVideoOptions | undefined
  >(undefined); // Selected source of the video player

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

  // check if watched
  const checkIfWatched = async () => {
    if (!duration) return;
    const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );
    if (checkInDb?.length < 1) return;
    const findEpisode = checkInDb.find(
      (episode: any) => episode.episode_number === episode_info.episode_number,
    );

    if (findEpisode && findEpisode?.watched_percentage) {
      const watchedSeekTo = (findEpisode.watched_percentage * duration) / 100;
      seekTo(watchedSeekTo);
    } else if (watched_percentage && watched_percentage > 0) {
      const watchedSeekTo = (watched_percentage * duration) / 100;
      seekTo(watchedSeekTo);
    }
  };

  // on load start event
  const onLoadStart = () => {
    setLoading(true);
  };

  // on load event
  const onLoad = async (data: OnLoadData) => {
    setDuration(data.duration);
    setLoading(false);
    await checkIfWatched();

    if (showControls) {
      setControlTimeout();
    }
  };

  // on progress event
  const onProgress = (data: OnProgressData) => {
    if (!scrubbing) {
      setCurrentTime(data.currentTime);

      if (duration) {
        const hasJustWatched = (data?.currentTime / duration) * 100;

        if (hasJustWatched > watchTimeBeforeSync) {
          if (!watchedAnilist && privateMode === 'off') {
            updateAnilist(
              anime_info,
              episode_info,
              watchedAnilist,
              setWatchedAnilist,
              privateMode,
              accessToken,
            );
          }
          if (!watched) {
            updateDB(
              data?.currentTime ?? currentTime,
              duration,
              parseInt(anime_info.id),
              episode_info,
              hasJustWatched,
            );
            setWatched(true);
          }
        }
      }
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

  // skip intro/outro
  const skipPart = (
    part: 'opening' | 'ending',
    wantToUpdate: boolean = false,
  ) => {
    if (!skipData?.[part]?.interval) return;
    const partStartTime = skipData[part].interval.startTime;
    const isCurrentPosAtPart = currentTime >= partStartTime;

    const partEndTime = skipData[part].interval.endTime;

    if (isCurrentPosAtPart && wantToUpdate) {
      if (part === 'opening' && !hasSkipedIntro) {
        setHasSkippedIntro(true);
        seekTo(partEndTime + 5);
      } else if (part === 'ending' && !hasSkipedEnding) {
        setHasSkippedEnding(true);
        seekTo(partEndTime);
      }
    } else if (isCurrentPosAtPart && !wantToUpdate) {
      seekTo(partEndTime);
    }
  };

  // auto skip
  const autoSkip = () => {
    if (!currentTime || !duration) return;

    if (skipDataPending) return;

    if (skipData?.opening?.interval && autoSkipIntro === 'on') {
      skipPart('opening', true);
    }

    if (skipData?.ending?.interval && autoSkipOutro === 'on') {
      skipPart('ending', true);
    }
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

  // focus effect that runs when any of these [data, isError, error, duration, episode_info] changes
  useFocusEffect(
    useCallback(() => {
      if (setShowNavBar) setShowNavBar(false);
      if (!data) return;
      setSelectedSource(findHighestQuality);

      if (isError && setShowNavBar) {
        setShowNavBar(true);
      }
    }, [data, isError, error, duration, episode_info]),
  );

  // focus effect that runs when any of these [data, isError, error, currentTime, duration, episode_info] changes
  useFocusEffect(
    useCallback(() => {
      if (!data) return;
      createAndUpdateDB(anime_info, episode_info, next_episode_id);
      checkIfWatchedFromDB(anime_info, episode_info, setWatched);

      autoSkip();
    }, [data, isError, error, currentTime, duration, episode_info]),
  );

  // data is pending from the useQuery (getting the srcs)
  if (isPending) return <MiddleOfScreenLoadingComponent />;

  // if the use query returns an error
  if (isError || error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message ?? 'Something went wrong',
    });
  }

  // if failed to select a source
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
        skipPart={skipPart}
        skipTimes={skipData}
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
