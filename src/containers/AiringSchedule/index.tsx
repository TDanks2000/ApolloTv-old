import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {API_BASE} from '@env';
import {api, utils} from '../../utils';

const AiringScheduleContainer = () => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const fetcher = async () => {
    const res = await api.fetcher(
      `${API_BASE}/anilist/airing-schedule?notYetAired=true&perPage=50`,
    );

    const sortedAnime: any = {};

    await res.results.forEach((anime: any) => {
      const date = utils.epochTime(anime.airingAt * 1000);

      // add to sortedAnime based on the date if object with date as identifier doesnt exist make one or add it to it ( sortedAnime is an object not an array)
      sortedAnime[date] = sortedAnime[date]
        ? [...sortedAnime[date], anime]
        : [anime];
      // sort the array of anime based on the episode number
      sortedAnime[date].sort((a: any, b: any) => a.episode - b.episode);
    });

    return sortedAnime;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['airingSchedule'],
    queryFn: fetcher,
  });

  if (isPending) return null;

  const dates = Object.keys(data);

  return (
    <View>
      {dates.map((date: any) => {
        return (
          <View key={date}>
            <Text>{date}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AiringScheduleContainer;
