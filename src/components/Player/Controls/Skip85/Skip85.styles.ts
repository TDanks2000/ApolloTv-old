import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {rgba} from 'polished';
import {Text} from '../../../../styles/sharedStyles';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  margin-bottom: 98px;
  z-index: 1000;
`;

type Props = {
  isMobile: boolean;
};

export const Wrapper = styled.TouchableOpacity<Props>`
  padding: 7px 15px;
  background: ${({theme}) => rgba(theme.base.mainColor, 1)};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextSkip = styled(Text)`
  color: ${({theme}) => theme.text.primary};
  font-weight: bold;
`;

export const SkipIcon = styled(Icon)`
  color: ${({theme}) => theme.text.primary};
  font-size: 17px;
  margin-left: 10px;
`;
