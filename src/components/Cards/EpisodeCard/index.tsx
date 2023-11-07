import React, {useEffect, useState} from 'react';
import {
  BottomBanner,
  BottomBannerTextContainer,
  DownloadBackground,
  DownloadButton,
  DownloadContainer,
  DownloadIcon,
  DownloadWrapper,
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
import {useIsDownloaded} from '../../../hooks';
import {DownloadManager, api, event, utils} from '../../../utils';
import {API_BASE} from '@env';
import {useDownloadQueue} from '../../../contexts/DownloadQueue';

import BackgroundJob from 'react-native-background-actions';
import Toast from 'react-native-toast-message';

const EpisodeCard = (props: EpisodeCardProps) => {
  const {addToQueue, removeFromQueue} = useDownloadQueue(); // Access the DownloadQueue
  const {sourceProvider, preferedQuality} = React.useContext(SettingsContext);

  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

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
  const isRunning = BackgroundJob.isRunning();

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

  const {isDownloaded} = useIsDownloaded(anime_info, episode_number!);

  const download = async () => {
    try {
      const data = await api.fetcher(
        `${API_BASE}/anilist/watch?episodeId=${id}&provider=${sourceProvider}`,
      );

      if (!data) return setError(true);

      const downloadManager = new DownloadManager(
        {
          data: anime_info,
          episode_data: {
            image: image,
            id,
            title,
            episode_number,
            isFiller,
          },
          episode_number: episode_number!,
          episode_title: title ?? `Episode ${episode_number ?? 1}`,
          headers: data?.headers,
          sources: data?.sources,
          title: anime_info.title,
        },
        () => {
          setDownloadProgress(100);
          removeFromQueue(queue_id);
          Toast.show({
            type: 'info',
            text1: `Succesfully download!`,
            text2: `${episode_number} - ${utils.getTitle(anime_info.title)}`,
          });
          setError(false);
        },
        () => {
          setDownloadProgress(0);
          removeFromQueue(queue_id);

          setError(true);
          Toast.show({
            type: 'error',
            text1: `There was an error downloading`,
            text2: `${episode_number} - ${utils.getTitle(anime_info.title)}`,
            autoHide: false,
          });
        },
        preferedQuality ?? '1080p',
      );

      addToQueue(queue_id, downloadManager);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProgress = (progress: number) => {
    setDownloadProgress(progress);
  };

  useEffect(() => {
    event.on(`progress_${queue_id}`, (data: {id: string; progress: number}) => {
      updateProgress(data.progress);
    });

    return () => {
      event.off(`progress_${queue_id}`);
    };
  }, [updateProgress]);

  const imageAlts = image ? image : anime_info.image;

  return (
    <EpisodeContainer onPress={onPress}>
      <EpisodeImageBackground
        source={{
          uri: imageAlts,
        }}>
        <DownloadWrapper onPress={download} disabled={isDownloaded}>
          <DownloadContainer>
            <DownloadBackground
              downloadProgress={isDownloaded ? 100 : downloadProgress}
              error={error}
            />
            <DownloadButton>
              <DownloadIcon name="download" />
            </DownloadButton>
          </DownloadContainer>
        </DownloadWrapper>
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
