import {Quality, SourceVideoOptions} from '../../@types';

// TODO: add support for allanime
export const findQuality = (
  sources: SourceVideoOptions[],
  preferedQuality?: Quality,
): SourceVideoOptions => {
  if (!sources)
    return {
      quality: '',
      url: '',
    };
  if (sources?.length < 1) return sources[0];

  const highest = sources.reduce((prevSource: any, currentSource: any) => {
    const prevQuality: string | undefined = prevSource?.quality?.split('p')[0];
    const currentQuality: string | undefined =
      currentSource?.quality?.split('p')[0];

    const prevNumericOnly: string | undefined = prevQuality?.replace(/\D/g, '');
    const currentNumericOnly: string | undefined = currentQuality?.replace(
      /\D/g,
      '',
    );

    if (preferedQuality) {
      const preferedQualityWithoutP = preferedQuality?.split('p')[0];
      // find quality that matches prefered quality

      if (preferedQuality === 'HIGHEST') {
        if (parseInt(currentNumericOnly!) > parseInt(prevNumericOnly!))
          return FormatSource(currentSource);
        else return FormatSource(prevSource);
      }

      if (preferedQuality === 'LOWEST') {
        if (parseInt(currentNumericOnly!) < parseInt(prevNumericOnly!))
          return FormatSource(currentSource);
        else return FormatSource(prevSource);
      }

      if (preferedQualityWithoutP === currentQuality)
        return FormatSource(currentSource);
      if (preferedQualityWithoutP === prevQuality)
        return FormatSource(prevSource);
      else return FormatSource(prevSource);
    } else {
      if (parseInt(currentNumericOnly!) > parseInt(prevNumericOnly!))
        return FormatSource(currentSource);
      else return FormatSource(prevSource);
    }
  });

  if (!highest) return findAbnormalQuality(sources);

  return highest;
};

export const FormatSource = (source: any) => {
  return {
    ...source,
    url: source.url ?? '',
    isM3U8: source?.isM3U8,
    quality: source?.quality?.replace(/\D/g, '') + 'P' ?? 'UNKOWN',
    isDub: source?.isDub,
  };
};

export const findAbnormalQuality = (sources: SourceVideoOptions[]) => {
  const data = sources.sort((a, b) => {
    if (
      a.quality?.toLowerCase()?.includes('mp4') &&
      !b.quality?.toLowerCase()?.includes('mp4')
    )
      return -1;
    if (
      b.quality?.toLowerCase()?.includes('mp4') &&
      !a.quality?.toLowerCase()?.includes('mp4')
    )
      return 1;
    if (a.quality < b.quality) return -1;
    if (a.quality > b.quality) return 1;
    return 0;
  });

  return data[0];
};

export const sortQualities = (
  qualities: SourceVideoOptions[],
): SourceVideoOptions[] => {
  qualities.sort((a, b) => {
    const qualityPattern = /(\d+)p/;
    const qualityA = parseInt(qualityPattern.exec(a.quality)?.[1] || '0');
    const qualityB = parseInt(qualityPattern.exec(b.quality)?.[1] || '0');

    if (
      a.quality?.toLowerCase()?.includes('mp4') &&
      !b.quality?.toLowerCase()?.includes('mp4')
    )
      return -1;
    if (
      b.quality?.toLowerCase()?.includes('mp4') &&
      !a.quality?.toLowerCase()?.includes('mp4')
    )
      return 1;

    // Compare the qualities in descending order
    return qualityB - qualityA;
  });

  return qualities;
};
