import React from 'react';
import {
  BottomBanner,
  BottomBannerTextContainer,
  EpisodeContainer,
  EpisodeImageBackground,
  EpisodeNumber,
  EpisodeTitle,
  FillerContainer,
  FillerText,
  PercentWatched,
  PercentWatchedContainer,
  Wrapper,
} from './EpisodeCard.styles';
import {EpisodeCardProps, StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';
import {SettingsContext} from '../../../contexts';

const EpisodeCard = (props: EpisodeCardProps) => {
  const {sourceProvider, preferedQuality} = React.useContext(SettingsContext);

  let {
    anime_info,
    episodeDBEntry,
    id,
    setEpisodeModalVisible,
    title,
    episode_number,
    image,
    watched_percentage,
    episodes,
    isFiller,
  } = props;
  const [actualWatchedPercent, setActualWatchedPercent] = React.useState<
    number | undefined
  >(watched_percentage);

  // const [downloadProgress, setDownloadProgress] = React.useState<number>(0);

  const navigation = useNavigation<StackNavigation>();

  const queue_id = `download_${anime_info.id}_${episode_number}`;
  const onPress = () => {
    navigation.navigate('VideoPlayer', {
      episode_id: id,
      source_provider: 'gogoanime',
      episode_info: {
        title: title ?? `Episode ${episode_number ?? 1}`,
        id,
        episode_number: episode_number,
        image: image,
      },
      anime_info: {
        id: anime_info.id,
        title: anime_info.title,
        malId: anime_info.malId,
      },
      episodes,
    });
    setEpisodeModalVisible(false);
  };

  React.useEffect(() => {
    if (
      episodeDBEntry?.watched_percentage &&
      watched_percentage &&
      watched_percentage <= 0
    )
      setActualWatchedPercent(episodeDBEntry?.watched_percentage ?? 0);
    else if (watched_percentage && watched_percentage > 0)
      setActualWatchedPercent(watched_percentage);
    else setActualWatchedPercent(undefined);
  }, []);

  // const {
  //   download,
  //   error,
  //   progress: downloadProgress,
  // } = useDownload(
  //   anime_info,
  //   {
  //     id: id,
  //     episode_number: episode_number!,
  //     title: title ?? `Episode ${episode_number ?? 1}`,
  //   },
  //   preferedQuality,
  //   sourceProvider,
  //   queue_id,
  // );

  // const isDownloaded = useIsDownloaded(anime_info, episode_number!);

  // const download = async () => {
  //   try {
  //     const data = await api.fetcher(
  //       `${API_BASE}/anilist/watch?episodeId=${id}&provider=${sourceProvider}`,
  //     );

  //     if (!data) return;

  //     const downloadManager = new DownloadManager(
  //       {
  //         data: anime_info,
  //         episode_number: episode_number!,
  //         episode_title: title ?? `Episode ${episode_number ?? 1}`,
  //         headers: data?.headers,
  //         sources: data?.sources,
  //         title: anime_info.title,
  //       },
  //       () => {},
  //       () => {},
  //       '1080p',
  //     );

  //     let interval: NodeJS.Timeout;

  //     interval = setInterval(() => {
  //       const progress = downloadManager.progress;
  //       setDownloadProgress(progress);
  //       if (progress >= 100) {
  //         clearInterval(interval);
  //         setTimeout(() => {
  //           setDownloadProgress(0);
  //         }, 1500);
  //       } else if (
  //         downloadManager.hasFinished ||
  //         downloadManager.hasStarted !== true
  //       ) {
  //         clearInterval(interval);
  //         setTimeout(() => {
  //           setDownloadProgress(0);
  //         }, 1500);
  //       }

  //       console.log(progress);

  //       setDownloadProgress(progress);

  //       return progress;
  //     }, 500);

  //     await downloadManager.downloadFile();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const imageAlts = image ? image : anime_info.image;

  return (
    <EpisodeContainer onPress={onPress}>
      <EpisodeImageBackground
        source={{
          uri: imageAlts,
        }}>
        {/* <DownloadWrapper>
          <DownloadContainer>
            <DownloadBackground
              downloadProgress={isDownloaded ? 100 : downloadProgress}
            />
            <DownloadButton onPress={download} disabled={isDownloaded}>
              <DownloadIcon name="download" />
            </DownloadButton>
          </DownloadContainer>
        </DownloadWrapper> */}
        {isFiller ? (
          <FillerContainer>
            <FillerText>Filler</FillerText>
          </FillerContainer>
        ) : null}
        {/* @ts-ignore */}
        <Wrapper>
          <BottomBanner>
            {actualWatchedPercent && actualWatchedPercent > 0 ? (
              <PercentWatchedContainer>
                <PercentWatched
                  watchedPercent={
                    actualWatchedPercent
                      ? actualWatchedPercent
                      : Boolean(episodeDBEntry?.watched) === true
                      ? 100
                      : 0
                  }
                />
              </PercentWatchedContainer>
            ) : null}
            <BottomBannerTextContainer>
              <EpisodeNumber
                numberOfLines={1}>{`Episode ${episode_number}`}</EpisodeNumber>
              <EpisodeTitle numberOfLines={1}>
                {title ?? `Episode ${episode_number}`}
              </EpisodeTitle>
            </BottomBannerTextContainer>
          </BottomBanner>
        </Wrapper>
      </EpisodeImageBackground>
    </EpisodeContainer>
  );
};

export default EpisodeCard;
