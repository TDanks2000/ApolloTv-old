import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

interface PillProps {
  selected?: boolean;
  selectedColor?: string;
}

export const PillContainer = styled.TouchableOpacity<PillProps>`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({selected, selectedColor, theme}) =>
    selected
      ? selectedColor
        ? rgba(selectedColor, 0.5)
        : rgba(theme.base.mainColor, 0.5)
      : 'rgba(255, 255, 255, 0.05)'};
`;

export const PillText = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
`;
