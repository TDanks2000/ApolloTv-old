import React from 'react';
import {
  Container,
  SliderBar,
  TextContainer,
  TimeSeperator,
  TotalTimeText,
  WatchTimeText,
} from './Slider.styles';
import {TouchableOpacity} from 'react-native';
import {UPDATEDB} from '../../../../screens/VideoPlayerScreen/helpers';

interface Props {
  currentTime: number;
  duration: number;
  setPaused: (paused: boolean) => void;
  videoRef: any;
}

const ControlsSlider = ({
  currentTime,
  duration,
  setPaused,
  videoRef,
}: Props) => {
  const [timeLeft, toggleTimeLeft] = React.useReducer(
    showTimeLeft => !showTimeLeft,
    false,
  );

  const timeToString = (timeInSeconds: number): string => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = Math.floor((timeInSeconds % 3600) % 60);

    const hDisplay = h > 0 ? (h < 10 ? '0' : '') + h + ':' : '';
    const mDisplay = (m < 10 ? '0' : '') + m + ':';
    const sDisplay = (s < 10 ? '0' : '') + s;
    return hDisplay + mDisplay + sDisplay;
  };

  const durationTimeFormatted = timeToString(duration);

  const currentTimeFormatted = timeToString(currentTime);

  const timeLeftFormatted = timeToString(duration - currentTime);

  const onSlidingStart = () => {
    setPaused(true);
  };

  const onSlidingComplete = (value: number) => {
    videoRef.current.seek(value);
    setPaused(false);
  };

  return (
    <Container>
      <SliderBar
        value={currentTime}
        maximumValue={duration}
        minimumValue={0}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        slideOnTap={true}
      />
      <TextContainer>
        <TouchableOpacity onPress={() => toggleTimeLeft()}>
          <WatchTimeText>
            {timeLeft ? `-${timeLeftFormatted}` : currentTimeFormatted}
          </WatchTimeText>
        </TouchableOpacity>
        <TimeSeperator>/</TimeSeperator>
        <TotalTimeText>{durationTimeFormatted}</TotalTimeText>
      </TextContainer>
    </Container>
  );
};

export default ControlsSlider;
