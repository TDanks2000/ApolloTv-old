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
  const durationTimeFormatted = dayjs(duration * 1000).format(
    duration > 3600000 ? 'HH:mm:ss' : 'mm:ss',
  );
  const currentTimeFormatted = dayjs(currentTime * 1000).format(
    currentTime > 3600000 ? 'HH:mm:ss' : 'mm:ss',
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
      />
      <TextContainer>
        <WatchTimeText>{currentTimeFormatted}</WatchTimeText>
        <TimeSeperator>/</TimeSeperator>
        <TotalTimeText>{durationTimeFormatted}</TotalTimeText>
      </TextContainer>
    </Container>
  );
};

export default ControlsSlider;
