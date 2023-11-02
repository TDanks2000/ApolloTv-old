import ReactNativeBlobUtil from 'react-native-blob-util';

import {M3uParser} from 'm3u-parser-generator';

import {
  FullAnimeInfo,
  Quality,
  SourceVideoOptions,
  TitleType,
} from '../../@types';
import * as utils from '../utils';
import {AnimeTrending, InfoData} from '../TestData';
import {helpers} from '..';

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

const normalizeTitle = (title: string): string => {
  // Remove illegal characters for filenames
  const illegalCharsRegex = /[<>:"/\\|?*\x00-\x1F]/g;
  const sanitizedTitle = title.replace(illegalCharsRegex, '');

  // Replace all characters with one space
  const spaceRegex = /\s+/g;
  const titleWithSpaces = sanitizedTitle.replace(spaceRegex, ' ');

  // Replace the space with a hyphen
  const normalizedTitle = titleWithSpaces.trim().replace(/\s/g, '-');

  return normalizedTitle;
};

class DownloadManager {
  downloadPath: string;

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

    this.downloadPath = `${
      ReactNativeBlobUtil.fs.dirs.DocumentDir
    }/ApolloTv/donwloads/${normalizeTitle(
      utils.getTitle(videoData.title) as string,
    )}`;

    this.success = success;
    this.error = error;

    this.hasFinished = false;
    this.hasStarted = false;
    this.isPaused = false;
    this.size = 0;

    const findPreferedQuality = videoData.sources.find(
      source => source.quality === preferedQuality,
    );
    const findHighestQuality = helpers.findQuality(videoData.sources);
    this.url = findPreferedQuality
      ? findPreferedQuality.url
      : findHighestQuality.url;
  }

  downloadFile = async (url: string, headers: any) => {};

  public static start = async () => {};

  public static pause = async () => {};

  public static resume = async () => {};

  public static cancel = async () => {};

  public static delete = async () => {};

  public static progress = async () => {};
}

(async () => {})();

export default DownloadManager;
