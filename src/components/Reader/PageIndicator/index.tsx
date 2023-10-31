import React from 'react';
import {
  PageIndicatorContainer,
  PageIndicatorText,
} from './PageIndicator.styles';
import {ReaderSettingsContext} from '../../../contexts/ReaderSettingsContext';

type Props = {
  page: number;
};

const PageIndicator: React.FC<Props> = ({page}) => {
  const {hideControls} = React.useContext(ReaderSettingsContext);
  return (
    <PageIndicatorContainer show={hideControls === true}>
      <PageIndicatorText>{page}</PageIndicatorText>
    </PageIndicatorContainer>
  );
};

export default PageIndicator;
