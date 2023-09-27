import styled from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

interface PillProps {
  active?: boolean;
}

export const PillContainer = styled.TouchableOpacity<PillProps>`
  padding: 0 15px;
  height: 30px;
  background: ${({theme, active}) =>
    active === false || !active
      ? 'rgba(255, 255, 255, 0.1)'
      : rgba(theme.base.mainColor, 0.8)};
  border-radius: 20px;
  overflow: hidden;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PillTitle = styled(Text)`
  text-align: center;
  font-size: 14px;
  color: ${({theme}) => theme.text.primary};

  text-transform: capitalize;
`;
