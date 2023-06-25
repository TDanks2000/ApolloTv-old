import {ITitleLanguageOptions, TitleLanguageOptions} from '../@types';
import sanitizer from 'sanitize-html';

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
    title.native ??
    title?.romanji ??
    title.userPreferred ??
    undefined
  );
};

export const textSanitizer = (textWithHTML: string): string => {
  return sanitizer(textWithHTML, {
    allowedTags: [],
  });
};
