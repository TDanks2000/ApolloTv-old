import {Animated} from 'react-native';
import {styled} from 'styled-components/native';

type ContainerProps = {
  shouldOpen: boolean;
};

export const SettingsContainer = styled(Animated.View)<ContainerProps>`
  position: absolute;
  top: 45px;
  right: 0;
  width: 300px;
  max-height: 300px;
  background-color: red;
  border-radius: 8px;
  padding: 15px 10px;
  overflow: hidden;

  background: black;

  pointer-events: ${({shouldOpen}) => (shouldOpen ? 'auto' : 'none')};
`;
