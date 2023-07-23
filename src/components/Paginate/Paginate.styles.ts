import {rgba} from 'polished';
import styled from 'styled-components/native';

export const PaginateContainer = styled.View``;

export const PaginateWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`;

type Props = {
  active: boolean;
};

type Size = {
  size?: 'sm' | 'normal';
};

export const PaginatePill = styled.TouchableOpacity<Props & Size>`
  border-radius: 20px;
  padding: ${({size}) => (size === 'sm' ? '5px 10px' : '10px 20px')};
  background: ${({theme}) => rgba(theme.text.offWhite, 0.09)};
  background: ${({active, theme}) =>
    active ? rgba(theme.base.mainColor, 0.2) : rgba(theme.text.offWhite, 0.09)};
`;

export const PaginatePillText = styled.Text<Size>`
  color: ${({theme}) => theme.text.primary};
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  text-transform: uppercase;
  font-size: ${({size}) => (size === 'sm' ? '13px' : '14px')};
`;
