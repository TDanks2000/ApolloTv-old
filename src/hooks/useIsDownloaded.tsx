import {useEffect, useState} from 'react';
import {AnimeInfo, EpisodeInfo} from '../@types';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {helpers, utils} from '../utils';

const useIsDownloaded = (anime_info: AnimeInfo, episode_number: number) => {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const title = utils.getTitle(anime_info.title)!;
  const downloadPath = `${
    ReactNativeBlobUtil.fs.dirs.DocumentDir
  }/ApolloTv/downloads/${helpers.normalizeTitle(title)}`;
  const folderPath = `${downloadPath}/${episode_number}/master.m3u8`;

  useEffect(() => {
    const checkFolderExists = async () => {
      try {
        const exists = await ReactNativeBlobUtil.fs.exists(folderPath);
        setIsDownloaded(exists);
      } catch (error) {
        console.error(error);
        setIsDownloaded(false);
      }
    };

    checkFolderExists();
  }, [anime_info, episode_number]);

  return {isDownloaded, folderPath};
};

export default useIsDownloaded;
