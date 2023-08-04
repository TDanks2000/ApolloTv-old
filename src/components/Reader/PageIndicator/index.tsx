import {View, Text} from 'react-native';
import React from 'react';
import {
  PageIndicatorContainer,
  PageIndicatorText,
} from './PageIndicator.styles';

type Props = {
  page: number;
  hideControls: boolean;
};

const PageIndicator: React.FC<Props> = ({page, hideControls}) => {
  return (
    <PageIndicatorContainer show={hideControls}>
      <PageIndicatorText>{page}</PageIndicatorText>
    </PageIndicatorContainer>
  );
};

export default PageIndicator;
