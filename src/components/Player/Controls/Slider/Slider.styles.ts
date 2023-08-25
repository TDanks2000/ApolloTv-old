import {styled} from 'styled-components/native';
import {Text} from '../../../../styles/sharedStyles';

import {Slider} from '@sharcoux/slider';

export const Container = styled.View`
  position: relative;
`;

export const SliderBar = styled(Slider).attrs(({theme}) => ({
  minimumTrackTintColor: theme.base.mainColor,
  maximumTrackTintColor: theme.text.offWhite,
  thumbTintColor: theme.base.mainColor,
}))``;

export const PercentWatched = styled.View`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
`;

export const TextContainer = styled.View`
  margin-top: 7px;

  width: 100%;
  flex-direction: row;
  gap: 6px;
`;

export const TimeSeperator = styled(Text)`
  color: ${({theme}) => theme.text.secondary};
  margin-left: 3px;
`;

export const WatchTimeText = styled(Text)`
  color: ${({theme}) => theme.text.primary};
`;

export const TotalTimeText = styled(Text)`
  color: ${({theme}) => theme.text.secondary};
`;
