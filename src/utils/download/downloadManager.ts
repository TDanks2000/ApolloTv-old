import RNFS from 'react-native-fs';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

import {M3uParser} from 'm3u-parser-generator';

import {
  FullAnimeInfo,
  Quality,
  SourceVideoOptions,
  TitleType,
} from '../../@types';
import * as utils from '../utils';
import {InfoData} from '../TestData';

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
      RNFS.DocumentDirectoryPath
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
    const findHighestQuality = utils.findHighestQuality(videoData.sources);
    this.url = findPreferedQuality
      ? findPreferedQuality.url
      : findHighestQuality.url;
  }

  downloadFile = async (url: string, headers: any) => {
    const folderPath = `${this.downloadPath}/${this.episodeNumber}`;
    const tempFolderPath = `${this.downloadPath}/${this.episodeNumber}/temp`;
    const m3u8Master = await (
      await fetch(url, {
        method: 'GET',
        headers,
      })
    ).text();

    // await RNFS.unlink(`${folderPath}/${url.split('/').pop()}`);

    const m3u8FilePath = `${tempFolderPath}/${url.split('/').pop()}`;
    const readM3U8Master = await RNFS.readFile(m3u8FilePath, 'utf8')
      .then(item => item)
      .catch(() => {});

    let playlist;
    if (!readM3U8Master) {
      // check if folder exists
      await RNFS.readDir(tempFolderPath).catch(() => {
        RNFS.mkdir(tempFolderPath);
      });

      // save m3u8master to folder
      RNFS.writeFile(
        `${tempFolderPath}/${url.split('/').pop()}`,
        m3u8Master,
        'utf8',
      );
      const m3u8Text = m3u8Master;

      playlist = M3uParser.parse(m3u8Text);
      return 'not already there';
    } else {
      playlist = M3uParser.parse(readM3U8Master);
    }

    let m3u8URL: any = url.lastIndexOf('/');
    m3u8URL = url.substring(0, m3u8URL + 1);

    const urlCollection = playlist.medias.map(item => {
      return {url: `${m3u8URL}${item.location}`};
    });

    await urlCollection.forEach(async item => {
      const fileName = item.url.split('/').pop();
      const filePath = `${tempFolderPath}/${fileName}`;

      const readFile = await RNFS.readFile(filePath, 'utf8')
        .then(item => item)
        .catch(() => {});

      if (readFile) return;

      await RNFS.downloadFile({
        fromUrl: item.url,
        toFile: filePath,
        progressDivider: 1,
        begin: (res: any) => {
          console.log(res.bytesWritten);
        },
        progress: (res: any) => {
          console.log(res.bytesWritten);
        },
        backgroundTimeout: 5000,
        background: true,
      }).promise.catch(err => console.log(err));

      console.log('downloaded', fileName);
    });

    console.log('all downloaded');

    const outputMp4File = `${folderPath}/video.mp4`;
    await this.convertToMp4(m3u8FilePath, outputMp4File);

    return urlCollection;
  };

  private convertToMp4 = async (
    m3u8FilePath: string,
    outputMp4File: string,
  ) => {
    console.log('started converting');
    const readFile = await RNFS.readFile(m3u8FilePath, 'utf8')
      .then(item => item)
      .catch(() => {});

    if (!readFile) return console.log('file does not exist');

    await FFmpegKit.executeAsync(
      `-allowed_extensions ALL -i ${m3u8FilePath} -c copy ${outputMp4File} -y`,
      session => {
        console.log('completed');
        // CALLED WHEN SESSION IS EXECUTED
      },
      log => {
        console.log(log);
        // CALLED WHEN SESSION PRINTS LOGS
      },
      statistics => {
        console.log(statistics);
        // CALLED WHEN SESSION GENERATES STATISTICS
      },
    )
      .then(() => console.log('completed'))
      .catch(err => console.log(err));

    return true;
  };

  public static start = async () => {};

  public static pause = async () => {};

  public static resume = async () => {};

  public static cancel = async () => {};

  public static delete = async () => {};

  public static progress = async () => {};
}

(async () => {
  const download = new DownloadManager(
    {
      data: InfoData as any,
      episode_number: 1,
      episode_title: 'Episode 2',
      headers: {
        Referer:
          'https://gotaku1.com/embedplus?id=MjA3Mzc1&token=CvnovvsQsarvyMoSOeev2A&expires=1689104276',
      },
      sources: [
        {
          url: 'https://www049.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1069.1689474813.360.m3u8',
          isM3U8: true,
          quality: '360p',
        },
        {
          url: 'https://www049.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1069.1689474813.480.m3u8',
          isM3U8: true,
          quality: '480p',
        },
        {
          url: 'https://www049.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1069.1689474813.720.m3u8',
          isM3U8: true,
          quality: '720p',
        },
        {
          url: 'https://www049.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1069.1689474813.1080.m3u8',
          isM3U8: true,
          quality: '1080p',
        },
        {
          url: 'https://www049.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1069.1689474813.m3u8',
          isM3U8: true,
          quality: 'default',
        },
        {
          url: 'https://www049.anifastcdn.info/videos/hls/hlE9PRdNYbD7SgDgo7Tb5g/1690714128/208288/0b594d900f47daabc194844092384914/ep.1069.1689474813.m3u8',
          isM3U8: true,
          quality: 'backup',
        },
      ],
      title: 'test',
    },
    () => {},
    () => {},
    '1080p',
  );

  console.log(
    'download',
    await download.downloadFile(download.url, download.videoData.headers),
  );
})();

export default DownloadManager;
