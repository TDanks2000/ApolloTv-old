import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  useContext,
  useMemo,
} from 'react';
import {View, Text, StatusBar, Platform} from 'react-native';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {OrientationLocker, LANDSCAPE} from 'react-native-orientation-locker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {MiddleOfScreenLoadingComponent, Player} from '../../components';
import {
  AniskipData,
  Episode,
  RootStackParamList,
  SourceVideoOptions,
  StackNavigation,
} from '../../@types';
import {api, settingsHelper, utils} from '../../utils';
import {API_BASE} from '@env';
import {
  NavigationContext,
  SettingsContext,
  useAccessToken,
} from '../../contexts';
import {episodeSQLHelper} from '../../utils/database';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {updateDB, watchTimeBeforeSync} from './helpers';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoPlayerScreen: React.FC<Props> = ({route}): JSX.Element => {
  const navigation = useNavigation<StackNavigation>();
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const {
    autoSkipOutro,
    autoSkipIntro,
    changeAutoSkip,
    autoNextEpisode,
    changeAutoNextEpisode,
    privateMode,
    preferedQuality,
  } = useContext(SettingsContext);

  const [watched, setWatched] = useState<boolean>(false);
  const [watchedAnilist, setWatchedAnilist] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<
    SourceVideoOptions | undefined
  >(undefined);
  const videoRef = useRef<Video>(null);

  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [skipData, setSkipData] = useState<any>();
  const [skipDataPending, setSkipDataPending] = useState<boolean>(true);

  const [hasSkipedIntro, toggleHasSkippedIntro] = useReducer(s => !s, false);
  const [hasSkipedEnding, toggleHasSkippedEnding] = useReducer(s => !s, false);

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
    const data = await api.fetcher<AniskipData>(
      `${API_BASE}/aniskip/${anime_info.malId}/${episode_info.episode_number}`,
    );

    if (!data) {
      return {
        ending: undefined,
        opening: undefined,
      };
    }

    const skipTimes: AniskipData = JSON.parse(JSON.stringify(data));

    let opening;
    let ending;
    for (const skipTime of Object.values(skipTimes)) {
      if (skipTime?.skipType?.toLowerCase() === 'op') opening = skipTime;
      if (skipTime?.skipType?.toLowerCase() === 'ed') ending = skipTime;
      if (opening && ending) break; // Break if both opening and ending are found.
    }

    const returnData = {
      ending,
      opening,
    };

    setSkipData(returnData);
    setSkipDataPending(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAniskip();
    }, [episode_id, anime_info]),
  );

  const {setShowNavBar}: any = useContext(NavigationContext);

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

  useEffect(() => {
    checkIfWatched();
  }, [watched_percentage, duration]);

  const skipSection = (type: 'op' | 'ed', wantToUpdate: boolean = false) => {
    if (!skipData?.ending && !skipData?.opening) return;

    const skipItem = type === 'op' ? skipData.opening : skipData.ending;

    if (!skipItem || !skipItem.interval) return;

    const {startTime, endTime} = skipItem.interval;
    const isCurrentPosAtStart = currentTime >= startTime;

    if (isCurrentPosAtStart) {
      if (
        wantToUpdate &&
        ((type === 'op' && !hasSkipedIntro) ||
          (type === 'ed' && !hasSkipedEnding))
      ) {
        if (videoRef.current) {
          toggleHasSkippedIntro();
          toggleHasSkippedEnding();
          videoRef.current.seek(endTime);
        }
      } else if (!wantToUpdate) {
        if (videoRef.current) {
          videoRef.current.seek(endTime);
        }
      }
    }
  };

  const skipIntro = () => skipSection('op', true);
  const skipOutro = () => skipSection('ed', true);

  useEffect(() => {
    if (!videoRef?.current) return;
    if (!currentTime || !duration) return;

    if (skipDataPending) return;

    if (skipData?.opening?.interval && autoSkipIntro === 'on') {
      skipIntro();
    }

    if (skipData?.ending?.interval && autoSkipOutro === 'on') {
      skipOutro();
    }
  }, [currentTime, duration]);

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
      videoRef.current?.seek(watchedSeekTo);
    } else if (watched_percentage && watched_percentage > 0) {
      const watchedSeekTo = (watched_percentage * duration) / 100;
      videoRef.current?.seek(watchedSeekTo);
    }
  };

  useEffect(() => {
    checkIfWatched();
  }, [watched_percentage, duration]);

  const checkIfWatchedFromDB = async () => {
    const checkInDb: any = await episodeSQLHelper.selectFromAnimeId(
      anime_info.id,
    );

    if (!checkInDb) return setWatched(false);
    const find = checkInDb.find((item: any) => item.id === episode_info.id);
    if (find?.watched) setWatched(true);
    return setWatched(false);
  };

  const updateAnilist = async () => {
    if (privateMode === 'on') return false;
    if (!accessToken || watchedAnilist) return false;
    const didUpdate = await anilist.user.updateShow({
      mediaId: parseInt(anime_info.id),
      progress: episode_info.episode_number,
    });

    if (didUpdate) setWatchedAnilist(true);
  };

  let timeout: NodeJS.Timeout | null = null;

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data?.currentTime ?? 0);

    if (duration) {
      const hasJustWatched = (data?.currentTime / duration) * 100;

      if (hasJustWatched > watchTimeBeforeSync) {
        if (privateMode === 'off') updateAnilist();
        updateDB(
          data?.currentTime ?? currentTime,
          duration,
          episode_info,
          hasJustWatched,
        );
        setWatched(true);
      }
    }
  };

  const onLoad = (data: OnLoadData) => {
    if (!watched) updateDB(currentTime, duration, episode_info);
    setDuration(data.duration);
  };

  const onEnd = () => {
    if (!watched) updateDB(currentTime, duration, episode_info);
    if (autoNextEpisode === 'off' || !autoNextEpisode) return;
    const current_episode = episode_info.episode_number!;
    const next_episode_number = current_episode + 1;
    const next_episode =
      episodes.find(episode => episode.number === next_episode_number) ?? null;

    if (!next_episode) return;
    navigation.navigate('Info', {
      id: anime_info.id,
    });
    navigation.navigate('VideoPlayer', {
      anime_info: anime_info,
      episode_id: next_episode.id,
      episode_info: {
        id: next_episode.id,
        title: next_episode.title,
        episode_number: next_episode.number,
        image: next_episode.image,
      },
      episodes: episodes,
      source_provider: 'gogoanime',
      next_episode_id: episodes[episodes.indexOf(next_episode) + 1]?.id ?? null,
    });
  };

  const fetcher = async () => {
    try {
      return await api.fetcher(`${API_BASE}/anilist/watch/${episode_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['VideoPlayer', episode_id],
    queryFn: fetcher,
  });

  const sources: SourceVideoOptions[] = data?.sources;
  const findHighestQuality = utils.findQuality(sources, preferedQuality);

  useFocusEffect(
    useCallback(() => {
      if (!data) return;
      setSelectedSource(findHighestQuality);
      createAndUpdateDB();
      checkIfWatchedFromDB();
      setShowNavBar(false);

      if (isError) {
        setShowNavBar(true);
      }

      return () => {
        if (!watched) updateDB(currentTime, duration, episode_info);
        setShowNavBar(true);
        if (hasSkipedIntro === true) toggleHasSkippedIntro();
        if (hasSkipedEnding === true) toggleHasSkippedEnding();
        if (watched === true) setWatched(false);
      };
    }, [data, isError, error, currentTime, duration, episode_info]),
  );

  const USER_AGENT = useMemo(
    () =>
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    [],
  );
  const referer = useMemo(() => data?.headers?.Referer ?? undefined, [data]);

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (isError || error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message ?? 'Something went wrong',
    });
  }

  if (!selectedSource) return <MiddleOfScreenLoadingComponent />;

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
      <OrientationLocker orientation={LANDSCAPE} />
      <StatusBar hidden={true} />
      <Player.PlayerControls
        paused={paused}
        setPaused={setPaused}
        videoRef={videoRef}
        currentTime={currentTime ?? 0}
        duration={duration ?? 0}
        updateDB={updateDB}
        episode_info={episode_info}
        anime_info={anime_info}
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
        onEnd={onEnd}
        onBuffer={data => {
          if (!watched) updateDB(currentTime, duration, episode_info);
          setIsBuffering(data.isBuffering);
        }}
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
        pictureInPicture={true}
        playInBackground={true}
        playWhenInactive={true}
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
