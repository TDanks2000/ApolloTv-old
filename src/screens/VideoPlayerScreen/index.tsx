import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {Player} from '../../components';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../utils';
import {API_BASE} from '@env';
import {NavigationContext} from '../../contexts';
import Orientation from 'react-native-orientation-locker';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoPlayerScreen = ({route}: Props) => {
  const {episode_id, episode_info, source_provider, anime_info} = route.params;

  const {setShowNavBar}: any = React.useContext(NavigationContext);

  React.useEffect(() => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);

    return () => {
      // lock to vertical
      Orientation.lockToPortrait();
      StatusBar.setHidden(false, 'slide');
    };
  }, [episode_id]);

  React.useEffect(() => {
    setShowNavBar(false);

    return () => {
      setShowNavBar(true);
    };
  }, []);

  const videoRef = React.useRef(null);

  const [paused, setPaused] = React.useState(true);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  const fetcher = async () => {
    return await api.fetcher(`${API_BASE}/anilist/watch/${episode_id}`);
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['VideoPlayer', episode_id],
    queryFn: fetcher,
  });

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>{error.message}</Text>;

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data?.currentTime ?? 0);
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
  };

  const findHighestQuality = (): {url: string; quality: string} => {
    const sources = data?.sources;

    if (!sources)
      return {
        url: '',
        quality: '',
      };
    if (sources?.length < 1) return sources[0];

    const highest = sources.reduce((prevSource: any, currentSource: any) => {
      const prevQuality = prevSource.quality.split('p')[0];
      const currentQuality = currentSource.quality.split('p')[0];

      if (parseInt(currentQuality) > parseInt(prevQuality))
        return currentSource;
      else return prevSource;
    });
    return highest;
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
      />
      <Video
        ref={videoRef}
        onLoad={onLoad}
        onProgress={onProgress}
        onBuffer={() => console.log('buffering')}
        source={{
          uri: findHighestQuality().url,
        }}
        muted={false}
        volume={1}
        paused={paused}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export default VideoPlayerScreen;
