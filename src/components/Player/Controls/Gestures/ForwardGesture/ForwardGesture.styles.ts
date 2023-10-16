import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(Animated.View)`
  position: absolute;
  /* top: 50%; */
  right: 0;
  height: 100%;
  align-self: center;
  display: flex;
  width: 40%;
  z-index: 2;
  border-top-left-radius: 99999px;
  border-bottom-left-radius: 99999px;
`;
