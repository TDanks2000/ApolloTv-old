import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {SliderComponent, SliderContainer} from './Slider.styles';
import {ReaderSettingsContext} from '../../../contexts/ReaderSettingsContext';

type Props = {
  minimumValue: number;
  maximumValue: number;
  flatlistRef: React.RefObject<FlatList>;

  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PageSlider: React.FC<Props> = ({
  minimumValue,
  maximumValue,
  flatlistRef,
  currentPage,
  setCurrentPage,
}) => {
  const {hideControls} = React.useContext(ReaderSettingsContext);

  const onScrollEnd = async (page: number) => {
    if (flatlistRef && !flatlistRef.current) return;
    flatlistRef.current?.scrollToIndex({
      index: page,
      animated: false,
    });
  };

  const onScroll = (page: number) => {
    setCurrentPage(page + 1);
  };

  return (
    <SliderContainer show={hideControls === true}>
      <SliderComponent
        value={currentPage - 1}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onSlidingComplete={value => onScrollEnd(value)}
        onValueChange={value => onScroll(value)}
        step={1}
      />
    </SliderContainer>
  );
};

export default PageSlider;
