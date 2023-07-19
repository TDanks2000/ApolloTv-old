import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const MiddleText = styled(Text)`
  font-size: 18px;
`;
