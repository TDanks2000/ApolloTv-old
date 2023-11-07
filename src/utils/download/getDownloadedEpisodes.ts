import ReactNativeBlobUtil from 'react-native-blob-util';
import {helpers, utils} from '..';
import {AnimeInfo} from '../../@types';

class GetDownloadedEpisodes {
  anime_info: AnimeInfo;
  downloadPath: string;

  constructor(anime_info: AnimeInfo) {
    this.anime_info = anime_info;

    this.downloadPath = `${
      ReactNativeBlobUtil.fs.dirs.DocumentDir
    }/ApolloTv/downloads/${helpers.normalizeTitle(
      utils.getTitle(anime_info.title) as string,
    )}`;
  }

  async get() {
    try {
      const files = await ReactNativeBlobUtil.fs.ls(this.downloadPath);
      return files;
    } catch (error) {
      return [];
    }
  }
}

export default GetDownloadedEpisodes;
