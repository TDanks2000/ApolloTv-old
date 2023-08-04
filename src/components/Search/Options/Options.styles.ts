import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

export const Container = styled.ScrollView`
  width: 100%;
  height: 50px;
  margin: 20px 0;
  margin-bottom: 5px;
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
