import {
  ITitleLanguageOptions,
  Quality,
  SourceVideoOptions,
  TitleLanguageOptions,
} from '../@types';
import sanitizer from 'sanitize-html';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export const getTitle = (
  title: string | ITitleLanguageOptions,
  preferedLanguage?: TitleLanguageOptions,
): string | undefined => {
  if (typeof title === 'string') return title;
  if (!title) return undefined;

  if (preferedLanguage)
    return (
      Object.entries(title).find(
        ([key]: any) => key === preferedLanguage,
      )?.[1] ?? undefined
    );

  return (
    title?.english ??
    title?.romaji ??
    title?.userPreferred ??
    title?.native ??
    undefined
  );
};

export const textSanitizer = (textWithHTML: string): string => {
  return sanitizer(textWithHTML, {
    allowedTags: [],
  });
};

export const epochTime = (time: number) => {
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-GB', options).format(new Date(time)); // returns DD/MM/YYYY
};

// returns a new object with the values at each key mapped using mapFn(value)
export const objectMap = (object: any, mapFn: Function) => {
  return Object.keys(object).reduce(function (result: any, key: string) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
};

export const isStringNullOrEmpty = (
  str: string | null | undefined,
): boolean => {
  return str === null || str === undefined || str.trim() === '';
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const ToggleSystemNavigation = (show: boolean) => {
  switch (show) {
    case true:
      SystemNavigationBar.lowProfile(true);
      break;
    case false:
      SystemNavigationBar.immersive();
      break;
  }
};

export const convertToDayOfWeek = (
  dayNumber: number,
  shortFormat: boolean = false,
): string => {
  const daysOfWeekShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekLong = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (dayNumber < 0 || dayNumber > 7) {
    throw new Error(
      'Invalid day number. Day number should be between 0 and 7.',
    );
  }

  return shortFormat ? daysOfWeekShort[dayNumber] : daysOfWeekLong[dayNumber];
};

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export const capitalizeFirstLetter = (text: string) =>
  text?.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
