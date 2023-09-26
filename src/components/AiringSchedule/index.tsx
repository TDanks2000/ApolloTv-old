import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
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
import {AiringSchedule} from '../../utils/TestData';
import {helpers, utils} from '../../utils';
import {AnimeByDay, AnimeByMonth} from '../../@types';

const AiringScheduleComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const {results} = AiringSchedule;
  const formatted = helpers.structureAiringSchedule(results);

  useEffect(() => {
    setInitialSelectedDay();
  }, []);

  const setInitialSelectedDay = () => {
    // Set the default day to the first available day
    const firstMonth = Object.keys(formatted[Object.keys(formatted)[0]])[0];
    const firstDay = Object.keys(
      formatted[Object.keys(formatted)[0]][firstMonth],
    )[0];
    setSelectedDay(firstDay);
  };

  const renderDateViews = (year: string, months: AnimeByMonth) => {
    return Object.entries(months).map(([month, days]) => {
      return (
        <View key={month}>
          <DaysContainer>{renderDays(year, month, days)}</DaysContainer>
          {renderAnimeContainer(year, month, days)}
        </View>
      );
    });
  };

  const renderDays = (year: string, month: string, days: any) => {
    return Object.entries(days).map(([day, animeList]) => {
      const releaseDate = new Date(`${year}-${month}-${day}`);
      const DayMonth = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
      }).format(releaseDate);

      console.log(selectedDay);
      return (
        <DateView
          key={day}
          onPress={() => setSelectedDay(day)}
          active={selectedDay === day}>
          <DayOfWeekText>
            {utils.convertToDayOfWeek(releaseDate.getDay(), true)}
          </DayOfWeekText>
          <DayMonthText>{DayMonth}</DayMonthText>
        </DateView>
      );
    });
  };

  const renderAnimeContainer = (
    year: string,
    month: string,
    days: AnimeByDay,
  ) => {
    return selectedDay === null || selectedDay in days ? (
      <AnimesContainer>
        {selectedDay !== null &&
          days[selectedDay].map(anime => {
            const releasingAtDate = new Date(anime.airingAt);
            const dateFormatted = new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(releasingAtDate);

            return (
              <AnimeContainer key={anime.id}>
                <AnimeTime>{dateFormatted}</AnimeTime>
                <AnimeTitle numberOfLines={1}>
                  {utils.getTitle(anime.title as any)}
                </AnimeTitle>
              </AnimeContainer>
            );
          })}
      </AnimesContainer>
    ) : (
      <Text>Select a day to view anime</Text>
    );
  };

  return (
    <View>
      {Object.entries(formatted).map(([year, months]) => (
        <View key={year}>{renderDateViews(year, months)}</View>
      ))}
    </View>
  );
};

export default AiringScheduleComponent;
