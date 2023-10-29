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
import Video from 'react-native-video';

interface Props {
  currentTime: number;
  duration: number;
  setPaused: (paused: boolean) => void;
  seekTo: (number: number) => void;

  setScrubbing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlsSlider = ({
  currentTime,
  duration,
  setPaused,
  seekTo,
  setScrubbing,
}: Props) => {
  const [timeLeft, toggleTimeLeft] = React.useReducer(
    showTimeLeft => !showTimeLeft,
    false,
  );

  const timeToString = (timeInSeconds: number): string => {
    const hour = Math.floor(timeInSeconds / 3600);
    const minute = Math.floor((timeInSeconds % 3600) / 60);
    const second = Math.floor((timeInSeconds % 3600) % 60);

    const hourDisplay = hour > 0 ? (hour < 10 ? '0' : '') + hour + ':' : '';
    const minuteDisplay = (minute < 10 ? '0' : '') + minute + ':';
    const secondDisplay = (second < 10 ? '0' : '') + second;
    return hourDisplay + minuteDisplay + secondDisplay;
  };

  const durationTimeFormatted = timeToString(duration);
  const currentTimeFormatted = timeToString(currentTime);
  const timeLeftFormatted = timeToString(duration - currentTime);

  const onSlidingStart = () => {
    setPaused(true);
    setScrubbing(true);
  };

  const onSlidingComplete = async (value: number) => {
    seekTo(value);
    setPaused(false);
    setScrubbing(false);
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
