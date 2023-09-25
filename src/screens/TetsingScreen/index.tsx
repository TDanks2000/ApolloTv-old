import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dropdown} from '../../components';
import {DropdownData} from '../../@types';
import {AiringSchedule} from '../../utils/TestData';

import {Circle, Svg} from 'react-native-svg';
import {helpers, utils} from '../../utils';
import {
  AnimeContainer,
  AnimesContainer,
  AnimeTime,
  AnimeTitle,
  DateView,
  DayMonthText,
  DayOfWeekText,
  DaysContainer,
} from './Testing.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer} from '../../styles/sharedStyles';

// const TestingScreen = () => {
//   type DataType = DropdownData<string, string>;
//   const [selected, setSelected] = React.useState<DataType | undefined>(
//     undefined,
//   );
//   const data: DataType[] = [
//     {
//       label: 'gogoanime',
//       value: '1',
//       image:
//         'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
//     },
//     {
//       label: '9Anime',
//       value: '1',
//       image:
//         'https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.my.nineanime/87b2fe48-9c36-11eb-8292-21241b1c199b/128x128',
//     },
//     {
//       label: 'KickAssAnime',
//       value: '1',
//       image: 'https://kickassanime.am/_nuxt/icons/icon_512x512.95dc24.png',
//     },
//     {
//       label: 'gogoanime',
//       value: '1',
//       image:
//         'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
//     },
//   ];
//   return (
//     <View
//       style={{
//         width: 300,
//       }}>
//       <Dropdown label="tets" data={data} onSelect={setSelected} />
//     </View>
//   );
// };

const TestingScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState<any>(null);

  const {results} = AiringSchedule;
  const formatted = helpers.structureAiringSchedule(results);

  React.useEffect(() => {
    // Set the default day to the first available day
    const firstMonth = Object.keys(formatted[Object.keys(formatted)[0]])[0];
    const firstDay = Object.keys(
      formatted[Object.keys(formatted)[0]][firstMonth],
    )[0];
    setSelectedDay(firstDay);
  }, []);

  return (
    <SafeAreaView>
      <SharedContainer>
        {Object.entries(formatted).map(([year, months]) => (
          <View key={year}>
            {Object.entries(months).map(([month, days]) => (
              <View key={month}>
                <DaysContainer>
                  {Object.entries(days).map(([day, animeList]) => {
                    const releaseDate = new Date(`${year}-${month}-${day}`);
                    const DayMonth = new Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      month: 'short',
                    }).format(releaseDate);

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
                  })}
                </DaysContainer>
                {selectedDay === null || selectedDay in days ? (
                  <AnimesContainer>
                    {selectedDay !== null &&
                      days[selectedDay].map(anime => {
                        const releasingAtDate = new Date(anime.airingAt);
                        const dateFormated = new Intl.DateTimeFormat('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                        }).format(releasingAtDate);
                        return (
                          <AnimeContainer key={anime.id}>
                            <AnimeTime>{dateFormated}</AnimeTime>
                            <AnimeTitle numberOfLines={1}>
                              {utils.getTitle(anime.title as any)}
                            </AnimeTitle>
                          </AnimeContainer>
                        );
                      })}
                  </AnimesContainer>
                ) : (
                  <Text>Select a day to view anime</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </SharedContainer>
    </SafeAreaView>
  );
};

export default TestingScreen;
