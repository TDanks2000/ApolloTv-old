import React, {PropsWithChildren, useState} from 'react';
import {AnimeInfo, EpisodeInfo} from '../../../@types';
import {GetDownloadedEpisodes} from '../../../utils';
import {Option, OptionText} from '../EpisodesModal.styles';
import {Icon} from './ShowDownloads.styled';

import {GestureResponderEvent} from 'react-native';

type Props = {
  anime_info: AnimeInfo;
  episodes: EpisodeInfo[];
  old_episodes: EpisodeInfo[];
  setEpisodes: React.Dispatch<React.SetStateAction<EpisodeInfo[]>>;
};

const ShowDownloads: React.FC<PropsWithChildren<Props>> = ({
  anime_info,
  episodes,
  old_episodes,
  setEpisodes,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const getDownloaded = new GetDownloadedEpisodes(anime_info);

  const onPress = async (e: GestureResponderEvent) => {
    if (active === true) {
      setActive(false);
      setEpisodes(old_episodes);
    } else {
      const downloaded: string[] = await getDownloaded.get();
      if (downloaded.length <= 0) return;
      else {
        setActive(true);
        // remove undownloaded from episodes
        for (const episode of episodes) {
          const episodeNumber = episode?.number ?? episode?.episode_number;
          if (downloaded.includes(episodeNumber.toString())) {
            // remove all undownloded items from episodes

            setEpisodes(
              episodes.filter(
                episode =>
                  episode?.number === episodeNumber ||
                  episode?.episode_number === episodeNumber,
                // episode?.number !== episodeNumber
              ),
            );
          }
        }
      }
    }
  };

  return (
    <Option onPress={onPress} active={active}>
      <Icon name="download" />
      <OptionText>Show</OptionText>
    </Option>
  );
};

export default ShowDownloads;
