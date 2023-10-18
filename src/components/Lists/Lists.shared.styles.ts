import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';

interface PillProps {
  selected?: boolean;
  selectedColor?: string;
  br?: `${number}px`;
}

export const PillContainer = styled.TouchableOpacity<PillProps>`
  padding: 5px 13px;
  border-radius: ${({br}) => (br ? br : '20px')};
  flex-direction: row;
  gap: 3px;
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

export const PillLength = styled(Text)`
  font-size: 12.5px;
  color: ${({theme}) => theme.text.offWhite};
`;
