import {View, Text} from 'react-native';
import React from 'react';
import {ExtraText, ExtraTextContailer, Seperator} from './ListCard.styles';
import {CardProps, MediaStatus} from '../../../@types';

type Props = Pick<
  CardProps,
  'progress' | 'status' | 'total_episodes' | 'start_date' | 'release_year'
> & {
  current_episodes?: number;
};

const EpisodeStats: React.FC<Props> = ({
  progress,
  status,
  total_episodes,
  current_episodes,
  start_date,
  release_year,
}) => {
  if (status && status === MediaStatus.NOT_YET_AIRED) {
    return (
      <>
        <ExtraText>TBA</ExtraText>
        <ExtraTextContailer>
          <ExtraText>Not Aired</ExtraText>
        </ExtraTextContailer>
      </>
    );
  }

  return (
    <>
      <ExtraText>
        {release_year
          ? release_year
          : start_date?.year
          ? start_date.year
          : '??'}
      </ExtraText>
      <ExtraTextContailer>
        <ExtraText bold={true} color={'main'}>
          {progress ?? 0}
        </ExtraText>
        <Seperator />
        {current_episodes === total_episodes ? (
          <ExtraText>{current_episodes}</ExtraText>
        ) : (
          <>
            <ExtraText>{current_episodes}</ExtraText>
            <Seperator />
            <ExtraText>{total_episodes ?? 0}</ExtraText>
          </>
        )}
      </ExtraTextContailer>
    </>
  );
};

{
  /* <ExtraTextContailer>
<ExtraText bold={true} color={'main'}>
  {progress ?? 0}
</ExtraText>
<Seperator />
{current_episodes === total_episodes ? (
  <ExtraText>{current_episodes}</ExtraText>
) : (
  <>
    <ExtraText>{current_episodes}</ExtraText>
    <Seperator />
    <ExtraText>{total_episodes ?? 0}</ExtraText>
  </>
)}
</ExtraTextContailer> */
}

export default EpisodeStats;
