import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  AnimeContainer,
  AnimesContainer,
  AnimeTime,
  AnimeTitle,
  DateView,
  DayMonthText,
  DayOfWeekText,
  DaysContainer,
} from './AiringSchedule.styles';
import {api, helpers, utils} from '../../utils';
import {AnimeByDate} from '../../@types';
import {useQuery} from '@tanstack/react-query';

const AiringScheduleComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const fetcher = async () => {
    const data = await api.getAiringSchedule();
    return data ?? [];
  };

  const {isPending, isError, data} = useQuery({
    queryKey: ['AiringSchedule'],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (!isPending && !isError) {
      setInitialSelectedDay();
    }
  }, [isPending, isError]);

  const formatted = data ? helpers.structureAiringSchedule(data) : null;

  const setInitialSelectedDay = () => {
    if (!formatted) return;

    const currentDate = new Date();
    const formattedDate = utils.formatDate(currentDate); // Format: "DD/MM/YYYY"

    // Check if today's date exists in the formatted data
    if (formatted[formattedDate]) {
      setSelectedDay(formattedDate);
    } else {
      // Fallback to the first available day
      const firstDate = Object.keys(formatted)[0];
      setSelectedDay(firstDate);
    }
  };

  const renderDateViews = (formattedData: AnimeByDate) => {
    const dateComponents = Object.entries(formattedData).map(
      ([date, animeList]) => {
        const dayComponent = renderDay(date, animeList);
        const animeContainers = renderAnimeContainers(animeList);

        return (
          <View key={date}>
            {dayComponent}
            {animeContainers}
          </View>
        );
      },
    );

    return <View style={{flexDirection: 'row'}}>{dateComponents}</View>;
  };

  const renderDay = (date: string, animeList: any[]) => {
    const DayMonth = date;

    return (
      <DateView
        key={date}
        onPress={() => setSelectedDay(date)}
        active={selectedDay === date}>
        <DayOfWeekText>
          {utils.convertToDayOfWeek(new Date(date).getDay(), true)}
        </DayOfWeekText>
        <DayMonthText>{DayMonth}</DayMonthText>
      </DateView>
    );
  };

  const renderAnimeContainers = (animeList: any[]) => {
    return selectedDay === null ? (
      <AnimesContainer>
        {animeList.map(anime => {
          const releasingAtDate = new Date(anime.airingAt * 1000);
          const dateFormatted = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(releasingAtDate);

          return (
            <AnimeContainer key={anime.id}>
              <AnimeTime>{dateFormatted}</AnimeTime>
              <AnimeTitle numberOfLines={1}>
                {utils.getTitle(anime.title)}
              </AnimeTitle>
            </AnimeContainer>
          );
        })}
      </AnimesContainer>
    ) : (
      <Text>Select a day to view anime</Text>
    );
  };

  if (!formatted) return null;

  return <ScrollView>{renderDateViews(formatted)}</ScrollView>;
};

export default AiringScheduleComponent;
