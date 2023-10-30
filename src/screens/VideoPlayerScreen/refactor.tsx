import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  EpisodeInfo,
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
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Video, {
  LoadError,
  OnBufferData,
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from 'react-native-video';
import {PanResponder, PanResponderStatic, StatusBar} from 'react-native';
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
  sources: SourceVideoOptions[];
  [x: string]: any;
}

const VideoPlayerScreen: React.FC<Props> = ({route}) => {
  // navigation
  const navigation = useNavigation<StackNavigation>();
  // access token
  const {accessToken} = useAccessToken();

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

  // set episode id to a state so i can update it forcing the next episode sources to be refetched
  const [episodeId, setEpisodeId] = useState<string>(episode_id);

  // fetch video links
  const {
    isPending,
    isError,
    data,
    error,
    refetch: refetchVideoData,
  } = useQuery({
    queryKey: ['VideoPlayer', episodeId, sourceProvider],
    queryFn: () =>
      fetcher(episodeId, sourceProvider ?? 'gogoanime', preferedVoice ?? 'sub'),
  });

  // skip Data
  const [skipData, setSkipData] = useState<any>();
  const [skipDataPending, setSkipDataPending] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      fetchAniskip(anime_info, episodeInfo, setSkipData, setSkipDataPending);
    }, [episodeId, anime_info]),
  );

  // State variables for video playback controls
  const [paused, setPaused] = useState(false); // State for video pause status
  const [muted, setMuted] = useState(false); // State for video mute status
  const [volume, setVolume] = useState(100); // State for video volume level
  const [rate, setRate] = useState(1.0); // State for video playback rate

  // State variables for skipping intro and ending
  const [hasSkipedIntro, setHasSkippedIntro] = useState<boolean>(false); // State for whether the intro has been skipped
  const [hasSkipedEnding, setHasSkippedEnding] = useState<boolean>(false); // State for whether the ending has been skipped
  const [checkedIfWatched, setCheckedIfWatched] = useState<boolean>(false);

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

  const [episodeInfo, setEpisodeInfo] = useState<EpisodeInfo>(episode_info); // set episode info to a state so i can update it forcing a ui update
  const [nextEpisodeId, setNextEpisodeId] = useState<string | undefined>(
    next_episode_id,
  ); // set next episode id to a state so i can easily update it
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
    sources: data?.sources ?? [],
  };

  // check if watched
  const checkIfWatched = async () => {
    if (!duration) return setCheckedIfWatched(true);
    const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );
    if (checkInDb?.length < 1) return setCheckedIfWatched(true);
    const findEpisode = checkInDb.find(
      (episode: any) => episode.episode_number === episodeInfo.episode_number,
    );

    if (findEpisode && findEpisode?.watched_percentage) {
      const watchedSeekTo = (findEpisode.watched_percentage * duration) / 100;
      seekTo(watchedSeekTo);
      setCheckedIfWatched(true);
    } else if (watched_percentage && watched_percentage > 0) {
      const watchedSeekTo = (watched_percentage * duration) / 100;
      seekTo(watchedSeekTo);
      setCheckedIfWatched(true);
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

      if (duration && !loading) {
        const hasJustWatched = (data?.currentTime / duration) * 100;

        if (hasJustWatched > watchTimeBeforeSync) {
          if (!watchedAnilist && privateMode === 'off') {
            updateAnilist(
              anime_info,
              episodeInfo,
              watchedAnilist,
              setWatchedAnilist,
              checkedIfWatched,
              privateMode,

              accessToken,
            );
          }
          if (!watched) {
            updateDB(
              data?.currentTime ?? currentTime,
              duration,
              parseInt(anime_info.id),
              episodeInfo,
              checkedIfWatched,
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
        data.currentTime,
        duration,
        parseInt(anime_info.id),
        episodeInfo,
        checkedIfWatched,
      );
    }
  };

  // on end event
  const onEnd = () => {
    if (!watched) {
      updateDB(
        currentTime,
        duration,
        parseInt(anime_info.id),
        episodeInfo,
        checkedIfWatched,
      );
    }
    if (autoNextEpisode === 'off' || !autoNextEpisode) return;
    const current_episode = episodeInfo.episode_number!;
    const next_episode_number = current_episode + 1;
    const next_episode =
      episodes.find(episode => episode.number === next_episode_number) ?? null;
    const next_next_episode =
      episodes.find(episode => episode.number === next_episode_number + 1) ??
      null;

    if (!next_episode) return;
    setEpisodeId(next_episode.id);
    setEpisodeInfo(next_episode);
    setNextEpisodeId(next_next_episode ? next_next_episode.id : undefined);
    setLoading(true);
  };

  // error event
  const onError = (err: LoadError) => {
    if (setShowNavBar) setShowNavBar(true);

    const errorString = err.error.errorString;

    Toast.show({
      type: 'error',
      text1: 'Error playing video',
      text2: !errorString
        ? 'please try again later'
        : `${errorString
            ?.split(':')[1]
            ?.replaceAll('_', ' ')
            ?.replace(' ', '')}`,
    });
  };

  // on buffering event
  const onBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
  };

  // callback function that is called when the audio is about to become 'noisy' due to a change in audio outputs.
  const onAudioBecomingNoisy = () => {
    setPaused(true);
  };

  // on screen touch event
  const onScreenTouch = () => {
    clearTimeout(player.controlTimeout!);
    setShowControls(prev => !prev);

    player.controlTimeout = setTimeout(() => {
      if (paused) return;
      setShowControls(true);
    }, player.controlTimeoutTime);
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
      episodeInfo,
      checkedIfWatched,
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

  // find the highest quality or prefered quality (if setting is set)
  const findHighestQuality = helpers.findQuality(
    player.sources,
    preferedQuality,
  );

  // focus effect that runs when any of these [data, isError, error, duration, episodeInfo] changes
  useFocusEffect(
    useCallback(() => {
      if (setShowNavBar) setShowNavBar(false);
      if (!data) return;
      setSelectedSource(findHighestQuality);

      if (isError && setShowNavBar) {
        setShowNavBar(true);
      }
    }, [data, isError, error, duration, episodeInfo]),
  );

  // focus effect that runs when any of these [data, isError, error, currentTime, duration, episodeInfo] changes
  useFocusEffect(
    useCallback(() => {
      if (!data) return;
      createAndUpdateDB(anime_info, episodeInfo, nextEpisodeId);
      checkIfWatchedFromDB(
        anime_info,
        episodeInfo,
        setWatched,
        checkedIfWatched,
      );

      autoSkip();
    }, [data, isError, error, currentTime, duration, episodeInfo]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (setShowNavBar) setShowNavBar(true);
      };
    }, [data, isError, error, episodeInfo]),
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
        episode_info={episodeInfo}
        episodes={episodes}
        resizeMode={resizeMode}
        setResizeMode={setResizeMode}
        selectedQuality={selectedSource!}
        setSelectedQuality={setSelectedSource}
        sources={player.sources}
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
        onAudioBecomingNoisy={onAudioBecomingNoisy}
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
