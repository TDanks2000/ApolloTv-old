import {ITitleLanguageOptions, TitleLanguageOptions} from '../@types';

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
