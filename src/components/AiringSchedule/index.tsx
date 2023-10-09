import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  AnimeContainer,
  AnimesContainer,
  AnimeTime,
  AnimeTitle,
  Container,
  DateView,
  DayMonthText,
  DayOfWeekText,
  DaysContainer,
} from './AiringSchedule.styles';
import {api, helpers, utils} from '../../utils';
import {AnimeByDate} from '../../@types';
import {useQuery} from '@tanstack/react-query';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

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

  const renderDateViews = (formatted: AnimeByDate) => {
    const dates = Object.keys(formatted);
    return (
      <DaysContainer>
        {dates.map(date => {
          let real_date: any = dayjs(date, 'DD/MM/YYYY');

          return (
            <DateView
              key={date}
              onPress={() => setSelectedDay(date)}
              active={selectedDay === date}>
              <DayMonthText>{real_date.format('DD - MMM')}</DayMonthText>
              <DayOfWeekText>{real_date.format('dddd')}</DayOfWeekText>
            </DateView>
          );
        })}
      </DaysContainer>
    );
  };

  const renderAnimeViews = (formatted: AnimeByDate) => {
    const slectedAnime = formatted[selectedDay!];

    if (!slectedAnime) return null;
    return (
      <AnimesContainer>
        {slectedAnime.map(anime => {
          const title = utils.getTitle(anime.title);
          const date = dayjs(anime.airingAt * 1000).format('HH:mm');

          return (
            <AnimeContainer>
              <AnimeTime>{date} </AnimeTime>
              <AnimeTitle>{title}</AnimeTitle>
            </AnimeContainer>
          );
        })}
      </AnimesContainer>
    );
  };

  if (!formatted) return null;

  return (
    <>
      {renderDateViews(formatted)}
      <Container>{renderAnimeViews(formatted)}</Container>
    </>
  );
};

export default AiringScheduleComponent;
