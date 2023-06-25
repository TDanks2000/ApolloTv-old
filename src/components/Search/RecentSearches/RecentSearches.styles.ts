import {rgba} from 'polished';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.FlatList`
  width: 100%;
  margin: 15px 0;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

interface PillProps {
  active?: boolean;
}

export const PillContainer = styled.TouchableOpacity<PillProps>`
  padding: 0 20px;
  height: 35px;
  background: ${({theme, active}) =>
    active === false || !active
      ? 'rgba(0, 0, 0, 0.8)'
      : rgba(theme.base.mainColor, 0.8)};
  border-radius: 20px;
  overflow: hidden;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PillTitle = styled(Text)`
  text-align: center;
  font-size: 11px;
  color: ${({theme}) => theme.text.primary};

  text-transform: capitalize;
`;
