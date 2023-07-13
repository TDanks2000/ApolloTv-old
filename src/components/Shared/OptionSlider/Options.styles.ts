import {rgba} from 'polished';
import styled from 'styled-components/native';

interface Props {
  isActive: boolean;

  size?: 'sm' | 'md' | 'lg';
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

export const ItemSM = styled(Item)`
  padding: 5px 10px;
`;

export const ItemMD = styled(Item)`
  padding: 7px 15px;
`;

export const ItemLG = styled(Item)`
  padding: 10px 20px;
`;

export const ItemText = styled.Text<Props>`
  color: ${({isActive, theme}) => (isActive ? theme.base.mainColor : 'black')};

  font-weight: bold;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  text-transform: uppercase;
`;

export const ItemTextSM = styled(ItemText)`
  font-size: 11px;
`;

export const ItemTextMD = styled(ItemText)`
  font-size: 12px;
`;

export const ItemTextLG = styled(ItemText)`
  font-size: 14px;
`;
