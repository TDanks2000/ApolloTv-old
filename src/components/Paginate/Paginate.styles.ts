import {rgba} from 'polished';
import styled from 'styled-components/native';

export const PaginateContainer = styled.View`
  margin-bottom: 12px;
`;

export const PaginateWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`;

interface Props {
  active: boolean;
}

export const PaginatePill = styled.TouchableOpacity<Props>`
  border-radius: 20px;
  padding: 10px 25px;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.09)};
  background: ${({active, theme}) =>
    active ? rgba(theme.base.mainColor, 0.2) : rgba(theme.text.offWhite, 0.09)};
`;

export const PaginatePillText = styled.Text`
  color: ${({theme}) => theme.text.primary};
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  text-transform: uppercase;
  font-size: 15px;
`;
