import RNFS from 'react-native-fs';

import {M3uParser} from 'm3u-parser-generator';

import {
  FullAnimeInfo,
  Quality,
  SourceVideoOptions,
  TitleType,
} from '../../@types';
import * as utils from '../utils';
import {InfoData} from '../TestData';
import axios from 'axios';

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

  total: number = 0;
  progress: number = 0;

  success: Function;
  error: Function;
  hasFinished: boolean;
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

    // fetch the m3u8 file from the url

    const m3u8MasterRes = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const m3u8Master = await m3u8MasterRes.text();

    // await RNFS.unlink(`${folderPath}/${url.split('/').pop()}`);

    const m3u8FilePath = `${folderPath}/${url.split('/').pop()}`;

    // check if m3u8 master has already been downloaded
    const readM3U8Master = await RNFS.readFile(m3u8FilePath, 'utf8')
      .then(item => item)
      .catch(err => {});

    let playlist;
    // if it hasnt then write the file to the dir, if it is just parse it from the already saved dir
    if (!readM3U8Master) {
      // check if folder exists
      await RNFS.readDir(folderPath).catch(() => {
        RNFS.mkdir(folderPath);
      });

      // save m3u8master to folder
      RNFS.writeFile(
        `${folderPath}/${url.split('/').pop()}`,
        m3u8Master,
        'utf8',
      );
      const m3u8Text = m3u8Master;

      playlist = M3uParser.parse(m3u8Text);
    } else {
      playlist = M3uParser.parse(readM3U8Master);
    }

    let m3u8URL: any = url.lastIndexOf('/');
    m3u8URL = url.substring(0, m3u8URL + 1);

    this.total = playlist.medias.length;
    const urlCollection = playlist.medias.map(item => {
      return {url: `${m3u8URL}${item.location}`};
    });

    await urlCollection.forEach(async (item, index) => {
      const fileName = item.url.split('/').pop();
      const filePath = `${folderPath}/${fileName}`;

      const readFile = await RNFS.readFile(filePath)
        .then(item => {
          console.log('item', item);
          return item;
        })
        .catch(() => {});

      if (readFile) return true;
      await new Promise((resolve, reject) => {
        RNFS.downloadFile({
          fromUrl: item.url,
          toFile: filePath,
          progressDivider: 1,
          begin: (res: any) => {
            console.log(fileName, res.bytesWritten);
          },
          progress: (res: any) => {
            // console.log(res.bytesWritten);
          },
          backgroundTimeout: 5000,
          background: true,
        })
          .promise.then(() => {
            resolve('');
          })
          .catch(err => reject(err));

        // TODO: update this.progress

        console.log('downloaded', fileName);
      });
    });

    this.hasFinished = true;
    this.success();

    console.log('all downloaded');

    return 'done';
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
          'https://gotaku1.com/embedplus?id=MjA3ODYy&token=knC1TMzZrCFVmNIDXFoCZA&expires=1690813527',
      },
      sources: [
        {
          url: 'https://www043.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1068.1688869903.360.m3u8',
          isM3U8: true,
          quality: '360p',
        },
        {
          url: 'https://www043.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1068.1688869903.480.m3u8',
          isM3U8: true,
          quality: '480p',
        },
        {
          url: 'https://www043.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1068.1688869903.720.m3u8',
          isM3U8: true,
          quality: '720p',
        },
        {
          url: 'https://www043.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1068.1688869903.1080.m3u8',
          isM3U8: true,
          quality: '1080p',
        },
        {
          url: 'https://www043.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.1068.1688869903.m3u8',
          isM3U8: true,
          quality: 'default',
        },
        {
          url: 'https://www043.anifastcdn.info/videos/hls/VY3G5d71P5RlrhqJ0Saoow/1690820727/207862/0b594d900f47daabc194844092384914/ep.1068.1688869903.m3u8',
          isM3U8: true,
          quality: 'backup',
        },
      ],
      title: '11112122222211',
    },
    () => {},
    () => {},
    '1080p',
  );

  const downloadFile = await download.downloadFile(
    download.url,
    download.videoData.headers,
  );
})();

export default DownloadManager;
