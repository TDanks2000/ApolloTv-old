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
import {AnimeByDate, StackNavigation} from '../../@types';
import {useQuery} from '@tanstack/react-query';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

dayjs.extend(customParseFormat);

const AiringScheduleComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigation>();

  const navigate = (id: string) => {
    navigation.navigate('Info', {
      id: id,
    });
  };

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
    const today = new Date();
    const dates = Object.keys(formatted);
    return (
      <DaysContainer>
        {dates.map((date, i) => {
          let real_date: any = dayjs(date, 'DD/MM/YYYY');
          const real_today = dayjs(today);

          const is_same = real_date.isSame(real_today, 'date');

          return (
            <DateView
              key={`date-i-${date}`}
              onPress={() => setSelectedDay(date)}
              active={selectedDay === date}>
              <DayOfWeekText>
                {is_same ? 'Today' : real_date.format('dddd')}
              </DayOfWeekText>
              <DayMonthText>{real_date.format('MMM DD')}</DayMonthText>
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
        {slectedAnime.map((anime, i) => {
          const title = utils.getTitle(anime.title);
          const date = dayjs(anime.airingAt * 1000).format('HH:mm');

          return (
            <AnimeContainer
              key={`anime-airing-${anime.id}-${i}`}
              onPress={() => navigate(anime.id)}>
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
