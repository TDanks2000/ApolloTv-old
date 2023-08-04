import {styled} from 'styled-components/native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 999999999999px;
`;

export const CircleProgressComponent = styled(CircularProgressBase).attrs(
  ({theme}) => ({
    activeStrokeColor: theme.base.mainColor,
  }),
)``;
