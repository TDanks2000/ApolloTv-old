import RNFS from 'react-native-fs';
import {
  FullAnimeInfo,
  Quality,
  SourceVideoOptions,
  TitleType,
} from '../../@types';
import {utils} from '..';

type VideoData = {
  data: FullAnimeInfo;
  title: TitleType;
  episode_number: number;
  episode_title: string | undefined;
  headers: {
    Referer: string;
  };
  sources: SourceVideoOptions[];
  download?: string;
};

class DownloadManager {
  downloadPath: string = RNFS.DocumentDirectoryPath + '/ApolloTv/donwloads';

  videoData: VideoData;
  videoTitle: string | undefined;
  episodeTitle: string | undefined;
  episodeNumber: number | undefined;

  success: Function;
  error: Function;
  hasFinished: boolean;
  hasStarted: boolean;
  isPaused: boolean;
  size: number;
  maxBufferLength: number = 10;

  url: string;

  constructor(
    videoData: VideoData,
    success: Function,
    error: Function,
    preferedQuality: Quality,
  ) {
    this.videoData = videoData;
    this.videoTitle = utils.getTitle(videoData.data.title);
    this.episodeTitle = videoData.episode_title;
    this.episodeNumber = videoData.episode_number;

    this.success = success;
    this.error = error;

    this.hasFinished = false;
    this.hasStarted = false;
    this.isPaused = false;
    this.size = 0;

    const findPreferedQuality = videoData.sources.find(
      source => source.quality === preferedQuality,
    );
    const findHighestQuality = utils.findHighestQuality(videoData.sources);
    this.url = findPreferedQuality
      ? findPreferedQuality.url
      : findHighestQuality.url;
  }

  public static startDownload = async () => {};
}

export default DownloadManager;
