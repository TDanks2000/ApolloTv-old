import React from 'react';
import {
  Container,
  SliderBar,
  TextContainer,
  TimeSeperator,
  TotalTimeText,
  WatchTimeText,
} from './Slider.styles';
import dayjs from 'dayjs';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';

interface Props {
  currentTime: number;
  duration: number;
  setPaused: (paused: boolean) => void;
  videoRef: any;

  updateDB: () => void;
}

const ControlsSlider = ({
  currentTime,
  duration,
  setPaused,
  videoRef,
  updateDB,
}: Props) => {
  const [timeLeft, toggleTimeLeft] = React.useReducer(
    showTimeLeft => !showTimeLeft,
    false,
  );
  const durationTimeFormatted = dayjs(duration * 1000).format(
    duration > 3600000 ? 'HH:mm:ss' : 'mm:ss',
  );
  const currentTimeFormatted = dayjs(currentTime * 1000).format(
    currentTime > 3600000 ? 'HH:mm:ss' : 'mm:ss',
  );

  const timeLeftFormatted = dayjs(duration * 1000 - currentTime * 1000).format(
    duration > 3600000 ? 'HH:mm:ss' : 'mm:ss',
  );

  const onSlidingStart = () => {
    setPaused(true);
  };

  const onSlidingComplete = (value: number) => {
    videoRef.current.seek(value);
    setPaused(false);
    updateDB();
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
        <WatchTimeText>{currentTimeFormatted}</WatchTimeText>
        <TimeSeperator>/</TimeSeperator>
        <TouchableOpacity onPress={() => toggleTimeLeft()}>
          <TotalTimeText>
            {timeLeft ? timeLeftFormatted : durationTimeFormatted}
          </TotalTimeText>
        </TouchableOpacity>
      </TextContainer>
    </Container>
  );
};

export default ControlsSlider;
