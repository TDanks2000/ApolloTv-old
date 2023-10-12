import {Platform} from 'react-native';
import {useWindowDimensions} from 'react-native';

export const useBreakpoints = () => {
  const {width} = useWindowDimensions();

  const isMobile = !Platform.isTV || width <= 700;

  return {isMobile};
};
