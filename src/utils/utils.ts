import {
  ITitleLanguageOptions,
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
    title.english ??
    title.userPreferred ??
    title.native ??
    title?.romaji ??
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

export const sortQualities = (
  qualities: SourceVideoOptions[],
): SourceVideoOptions[] => {
  qualities.sort((a, b) => {
    const qualityPattern = /(\d+)p/;
    const qualityA = parseInt(qualityPattern.exec(a.quality)?.[1] || '0');
    const qualityB = parseInt(qualityPattern.exec(b.quality)?.[1] || '0');

    // Compare the qualities in descending order
    return qualityB - qualityA;
  });

  return qualities;
};

export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
};

export const findHighestQuality = (
  sources: SourceVideoOptions[],
): SourceVideoOptions => {
  if (!sources)
    return {
      quality: '',
      url: '',
    };
  if (sources?.length < 1) return sources[0];

  const highest = sources.reduce((prevSource: any, currentSource: any) => {
    const prevQuality = prevSource.quality.split('p')[0];
    const currentQuality = currentSource.quality.split('p')[0];

    if (parseInt(currentQuality) > parseInt(prevQuality)) return currentSource;
    else return prevSource;
  });

  return highest;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const ToggleSystemNavigation = (show: boolean) => {
  switch (show) {
    case true:
      SystemNavigationBar.leanBack(false);
      break;
    case false:
      SystemNavigationBar.leanBack(true);
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
