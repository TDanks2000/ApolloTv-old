import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from 'react-native-blob-util';

import {M3uParser} from 'm3u-parser-generator';

import {
  AnimeInfo,
  EpisodeInfo,
  FullAnimeInfo,
  Quality,
  SourceVideoOptions,
  TitleType,
} from '../../@types';
import * as utils from '../utils';
import {AnimeTrending, InfoData} from '../TestData';
import {helpers} from '..';
import EventEmitter from 'eventemitter3';
import BackgroundService, {
  BackgroundTaskOptions,
} from 'react-native-background-actions';

export type VideoData = {
  data: AnimeInfo;
  episode_data: EpisodeInfo;
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
  downloadPath: string;
  files: string[] = [];

  videoData: VideoData;
  videoTitle: string | undefined;
  episodeTitle: string | undefined;
  episodeNumber: number | undefined;

  success: Function;
  error: Function;
  hasFinished: boolean;
  hasStarted: boolean;
  size: number;
  progress: number = 0;

  url: string;

  eventEmitter = new EventEmitter();
  cancelFlag = false;

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
    }/ApolloTv/downloads/${helpers.normalizeTitle(
      utils.getTitle(videoData.title) as string,
    )}`;

    this.success = success;
    this.error = error;

    this.hasFinished = false;
    this.hasStarted = false;
    this.size = 0;

    const findHighestQuality = helpers.findQuality(
      videoData.sources,
      preferedQuality,
    );
    this.url = findHighestQuality.url;
  }

  private fetchDataAndImage = async (imageURL: string, folderPath: string) => {
    try {
      // Fetch the image from the provided URL
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
      }).fetch('GET', imageURL);

      // Get the image data after downloading
      const imageData = await response.readFile('base64');

      // Write the image data to a file named 'image.png' in the specified folder
      await ReactNativeBlobUtil.fs.writeFile(
        `${folderPath}/image.png`,
        imageData,
        'base64',
      );

      // Prepare data object
      const data = {
        title: this.videoTitle,
        episode_number: this.episodeNumber,
        episode_title: this?.episodeTitle ?? `Episode ${this.episodeNumber}`,
        anime_info: this.videoData.data,
        image_path: `${folderPath}/image.png`, // Store the image path in the data
      };

      // Write the data object to a JSON file
      await ReactNativeBlobUtil.fs.writeFile(
        `${folderPath}/data.json`,
        JSON.stringify(data),
        'utf8',
      );

      response.flush();
      return 'Data and image saved successfully!';
    } catch (error) {
      return 'Error while fetching image and saving data: ' + error;
    }
  };

  // TODO: notifications
  download = async () => {
    return new Promise(async (resolve, reject) => {
      const folderPath = `${this.downloadPath}/${this.episodeNumber}`;
      try {
        this.eventEmitter.on('cancelDownload', () => {
          // Implement cancellation logic here
          this.hasStarted = false; // Update the status to indicate cancellation
          console.log('Download canceled.');
          this.cancelFlag = true;
          // Perform any additional cleanup or cancellation tasks
          return;
        });

        this.hasStarted = true;

        const m3u8MasterRes = await fetch(this.url, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            ...this?.videoData?.headers,
          },
        });

        const m3u8Master = await m3u8MasterRes.text();

        const m3u8FilePath = `${folderPath}/master.m3u8`;

        const readM3U8Master = await ReactNativeBlobUtil.fs
          .readFile(m3u8FilePath, 'utf8')
          .then(item => {
            this.files.push(m3u8FilePath);
            return item;
          })
          .catch(err => {});

        let playlist;
        // if it hasnt then write the file to the dir, if it is just parse it from the already saved dir
        if (!readM3U8Master) {
          // check if folder exists
          await ReactNativeBlobUtil.fs.isDir(folderPath).catch(() => {
            ReactNativeBlobUtil.fs.mkdir(folderPath);
          });

          // save m3u8master to folder
          ReactNativeBlobUtil.fs.writeFile(
            `${folderPath}/master.m3u8`,
            m3u8Master,
            'utf8',
          );
          const m3u8Text = m3u8Master;

          playlist = M3uParser.parse(m3u8Text);
        } else {
          playlist = M3uParser.parse(readM3U8Master);
        }

        let m3u8URL: any = this.url.lastIndexOf('/');
        m3u8URL = this.url.substring(0, m3u8URL + 1);

        // this.total = playlist.medias.length;
        const urlCollection = playlist.medias.map(item => {
          return {url: `${m3u8URL}${item.location}`};
        });

        let completedCount = 0;
        let totalCount = urlCollection.length;

        for await (const item of urlCollection) {
          if (this.cancelFlag) {
            // Perform any necessary cancellation actions (e.g., cleanup, interruption)
            this.hasStarted = false;
            console.log('Download canceled.');
            return;
          }
          const fileName = item.url.split('/').pop();
          const filePath = `${folderPath}/${fileName}`;

          let fileExists = false;
          await ReactNativeBlobUtil.fs
            .exists(filePath)
            .then(item => {
              fileExists = item;
            })
            .catch(err => {
              fileExists = false;
            });

          if (fileExists) continue;
          await new Promise(async (resolve, reject) => {
            await ReactNativeBlobUtil.config({
              path: filePath,
            })
              .fetch('GET', item.url)
              .then(() => {
                resolve('');
              })
              .catch(err => {
                this.hasFinished = false;
                this.hasStarted = false;
                this.error();
                reject(err);
              });
          });
          this.files.push(filePath);

          completedCount++;
          const progress = (completedCount / totalCount) * 100;
          this.progress = progress;
        }

        // TODO: Implement logic to convert to mp4
        await this.fetchDataAndImage(
          this.videoData.episode_data.image!,
          folderPath,
        );

        this.hasFinished = true;
        this.success();

        // Upon successful completion of the function, resolve the promise
        resolve('Download completed successfully');

        console.log('all downloaded');
      } catch (error) {
        console.log(error);
        this.error();
        this.hasFinished = false;
        this.hasStarted = false;
        this.eventEmitter.removeListener('cancelDownload');
        reject('Download failed');
      } finally {
        this.eventEmitter.removeListener('cancelDownload');
      }
    });
  };

  downloadFile = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const options: BackgroundTaskOptions = {
          taskTitle: utils.getTitle(this.videoData.title)!,
          taskDesc: `Downloading ${
            this.episodeTitle
              ? this.episodeTitle
              : `Episode ${this.episodeNumber}`
          }`,
          taskName: `download_${helpers.normalizeTitle(
            utils.getTitle(this.videoData.title)!,
          )}_${this.episodeNumber}`,
          taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
          },
        };

        const task = async () => {
          await new Promise(async resolveTask => {
            await this.download().then(value => {
              resolveTask(value);
              resolve('Download file completed successfully');
            });
          });
        };

        await BackgroundService.start(task, options);

        // await BackgroundService.stop();

        // Upon successful completion of the function, resolve the promise
      } catch (error) {
        console.error(error);
        reject('Download file failed');
      }
    });
  };

  public cancel = async () => {
    this.eventEmitter.emit('cancelDownload');
  };

  public delete = async () => {
    try {
      if (this.files.length <= 0) return 'no files';
      this.eventEmitter.emit('cancelDownload');
      for await (const file of this.files) {
        await ReactNativeBlobUtil.fs.unlink(file);
      }
      return 'deleted';
    } catch (error) {
      return 'error';
    }
  };
}

export default DownloadManager;
