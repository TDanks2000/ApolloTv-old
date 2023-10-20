import styled from 'styled-components/native';
import {Text} from '../../../../styles/sharedStyles';
import {rgba} from 'polished';

export const Container = styled.Pressable`
  padding: 10px 15px;
  gap: 20px;
`;

export const SettingTitle = styled(Text)`
  font-size: 18px;
`;

export const PillsContainer = styled.View`
  flex-direction: row;
  gap: 15px;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
`;

type Props = {
  active?: boolean;
};

export const PillContainer = styled.TouchableOpacity<Props>`
  padding: 7px 12px;
  border-radius: 8px;
  background-color: ${({active, theme}) =>
    active ? rgba(theme.text.secondary, 0.5) : 'transparent'};
  border: 1px solid ${({theme}) => rgba(theme.text.secondary, 0.5)};
`;

export const PillText = styled(Text)`
  text-transform: capitalize;
  font-size: 15px;
`;
