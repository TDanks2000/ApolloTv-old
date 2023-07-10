import {rgba} from 'polished';
import styled from 'styled-components/native';

interface Props {
  isActive: string;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
`;

export const Item = styled.TouchableOpacity<Props>`
  padding: 7px 15px;
  background-color: ${({isActive, theme}) =>
    isActive ? 'black' : theme.text.secondary};
  border-top-width: ${({isActive}) => (isActive ? '2px' : '0px')};
  border-color: ${({theme}) => rgba(theme.base.mainColor, 0.9)};
  overflow: hidden;
`;

export const ItemText = styled.Text<Props>`
  color: ${({isActive, theme}) => (isActive ? theme.base.mainColor : 'black')};

  font-weight: bold;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  text-transform: uppercase;
`;
