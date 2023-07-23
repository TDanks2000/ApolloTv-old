import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {Player} from '../../components';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AniskipData,
  RootStackParamList,
  SourceVideoOptions,
} from '../../@types';
import {useQuery} from '@tanstack/react-query';
import {api, settingsHelper, utils} from '../../utils';
import {API_BASE} from '@env';
import {
  NavigationContext,
  SettingsContext,
  useAccessToken,
} from '../../contexts';
import Orientation from 'react-native-orientation-locker';
import {episodeSQLHelper} from '../../utils/database';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoPlayerScreen = ({route}: Props) => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const {autoSkipOutro, autoSkipIntro, changeAutoSkip} =
    React.useContext(SettingsContext);

  const watchTimeBeforeSync = 80;
  const [watched, setWatched] = React.useState<boolean>(false);
  const [watchedAnilist, setWatchedAnilist] = React.useState<boolean>(false);
  const [selectedSource, setSelectedSource] = React.useState<
    SourceVideoOptions | undefined
  >(undefined);

  const [hasSkipedIntro, toggleHasSkippedIntro] = React.useReducer(
    s => !s,
    false,
  );
  const [hasSkipedEnding, toggleHasSkippedEnding] = React.useReducer(
    s => !s,
    false,
  );

  const {
    episode_id,
    episode_info,
    source_provider,
    anime_info,
    next_episode_id,
    watched_percentage,
    episodes,
  } = route.params;

  const fetchAniskip = async () => {
    const skipTimes: AniskipData = await api.fetcher(
      `${API_BASE}/aniskip/${anime_info.malId}/${episode_info.episode_number}`,
    );

    const ending = skipTimes.find(item => item.skipType === 'ed');
    const opening = skipTimes.find(item => item.skipType === 'op');

    const returnData = {
      ending,
      opening,
    };

    return returnData;
  };

  const {
    isPending: skipDataPending,
    isError: isSkipDataErro,
    data: skipData,
    error: skipDataError,
  } = useQuery({
    queryKey: ['aniskip', episode_id],
    queryFn: fetchAniskip,
  });

  const {setShowNavBar}: any = React.useContext(NavigationContext);

  const createAndUpdateDB = async () => {
    await episodeSQLHelper.createTable();
    await episodeSQLHelper.insertEpisode({
      anime_id: Number(anime_info.id),
      episode_number: episode_info.episode_number,
      image: episode_info.image ?? '',
      watched_percentage: 0,
      watched: false,
      id: episode_info.id,
      title: episode_info.title ?? '',
      next_episode_id: next_episode_id,
    });
  };

  React.useEffect(() => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);

    return () => {
      // lock to vertical
      Orientation.lockToPortrait();
      StatusBar.setHidden(false, 'slide');
    };
  }, [episode_id]);

  const videoRef: any = React.useRef(null);

  const [paused, setPaused] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isBuffering, setIsBuffering] = React.useState<boolean>(false);

  const checkIfWatched = async () => {
    if (!duration) return;
    const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );
    if (checkInDb?.length < 1) return;
    const findEpisode = checkInDb.find(
      (episode: any) => episode.episode_number === episode_info.episode_number,
    );

    if (findEpisode) {
      const watchedSeekTo = (findEpisode.watched_percentage * duration) / 100;
      videoRef.current?.seek(watchedSeekTo);
    } else if (watched_percentage && watched_percentage > 0) {
      const watchedSeekTo = (watched_percentage * duration) / 100;
      videoRef.current?.seek(watchedSeekTo);
    }
  };

  React.useEffect(() => {
    checkIfWatched();
  }, [watched_percentage, duration]);

  const skipIntro = (wantToUpdate: boolean = false) => {
    if (!skipData?.opening?.interval) return;
    const openingStartTime = skipData.opening.interval.startTime;
    const isCurrentPosAtOpening = currentTime >= openingStartTime;

    const openingEndTime = skipData.opening.interval.endTime;

    if (isCurrentPosAtOpening && wantToUpdate && !hasSkipedIntro) {
      toggleHasSkippedIntro();
      videoRef.current.seek(openingEndTime);
    } else if (isCurrentPosAtOpening) {
      videoRef.current.seek(openingEndTime);
    }
  };

  const skipOutro = (wantToUpdate: boolean = false) => {
    if (!skipData?.ending?.interval) return;
    const endingStartTime = skipData.ending.interval.startTime;
    const isCurrentPosAtEnding = currentTime >= endingStartTime;

    const endingEndTime = skipData.ending.interval.endTime;

    if (isCurrentPosAtEnding && wantToUpdate && !hasSkipedEnding) {
      toggleHasSkippedEnding();
      videoRef.current.seek(endingEndTime);
    } else if (isCurrentPosAtEnding) {
      videoRef.current.seek(endingEndTime);
    }
  };

  // Skip intro / outro
  React.useEffect(() => {
    if (!videoRef?.current) return;
    if (skipDataPending) return;
    if (!currentTime || !duration) return;

    if (skipData?.opening?.interval && autoSkipIntro === 'on') {
      skipIntro(true);
    }

    if (skipData?.ending?.interval && autoSkipOutro === 'on') {
      skipOutro(true);
    }
  }, [currentTime, duration]);

  // Update sql progress
  const updateDB = async () => {
    if (watched) return;
    const watchedAnount = Math.floor((currentTime / duration) * 100);

    if (isNaN(watchedAnount)) return;
    await episodeSQLHelper.updateTable({
      id: episode_info.id,
      watched: watchedAnount > watchTimeBeforeSync ? true : false,
      watched_percentage:
        watchedAnount > 0 && watchedAnount > watchTimeBeforeSync
          ? 100
          : watchedAnount,
    });
  };

  // check if episode is wathced from the sql db
  const checkIfWatchedFromDB = async () => {
    const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );

    if (!checkInDb) return setWatched(false);
    const find = checkInDb.find((item: any) => item.id === episode_info.id);
    if (find?.watched) setWatched(true);
    return setWatched(false);
  };

  // Update anilist progress
  const updateAnilist = async () => {
    if (!accessToken || watchedAnilist) return false;
    const didUpdate = await anilist.user.updateShow({
      mediaId: parseInt(anime_info.id),
      progress: episode_info.episode_number,
    });

    if (didUpdate) setWatchedAnilist(true);
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data?.currentTime ?? 0);

    if (duration) {
      const watched = (data?.currentTime / duration) * 100;
      if (watched > watchTimeBeforeSync) {
        // update anilist progress
        updateAnilist();

        // update the progress in the sql db
        updateDB();
        setWatched(true);
      }
      if (watched > 100) {
        updateDB();
        setWatched(true);
      }
    }
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
  };

  const fetcher = async () => {
    return await api.fetcher(`${API_BASE}/anilist/watch/${episode_id}`);
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['VideoPlayer', episode_id],
    queryFn: fetcher,
  });

  const sources: SourceVideoOptions[] = data?.sources;
  const findHighestQuality = utils.findHighestQuality(sources);

  useFocusEffect(
    React.useCallback(() => {
      if (!data) return;
      setSelectedSource(findHighestQuality);
      createAndUpdateDB();
      checkIfWatchedFromDB();
      setShowNavBar(false);

      return () => {
        setShowNavBar(true);
        if (hasSkipedIntro === true) toggleHasSkippedIntro();
        if (hasSkipedEnding === true) toggleHasSkippedEnding();
        if (watched === true) setWatched(false);
      };
    }, [data]),
  );

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>{error.message}</Text>;

  if (!selectedSource) return <Text>Loading...</Text>;

  const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';

  const referer = data?.headers?.Referer ?? undefined;

  const showError = (errorString?: string) => {
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

  return (
    <View>
      <Player.PlayerControls
        paused={paused}
        setPaused={setPaused}
        videoRef={videoRef}
        currentTime={currentTime ?? 0}
        duration={duration ?? 0}
        episode_info={episode_info}
        anime_info={anime_info}
        updateDB={updateDB}
        selectedQuality={selectedSource}
        sources={sources}
        setSelectedQuality={setSelectedSource}
        checkIfWatched={checkIfWatched}
        isBuffering={isBuffering}
        skipTimes={skipData}
        skipFunctions={{
          skipIntro: skipIntro,
          skipOutro: skipOutro,
        }}
        episodes={episodes}
      />
      <Video
        ref={videoRef}
        onLoad={onLoad}
        onProgress={onProgress}
        onBuffer={data => setIsBuffering(data.isBuffering)}
        source={{
          uri: selectedSource.url,
          headers: {
            'User-Agent': USER_AGENT,
            Referrer: referer,
          },
        }}
        muted={false}
        volume={1}
        paused={paused}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
        onError={error => {
          showError(error.error.errorString);
        }}
      />
    </View>
  );
};

export default VideoPlayerScreen;
