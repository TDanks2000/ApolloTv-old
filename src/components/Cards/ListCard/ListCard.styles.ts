import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

type ContainerProps = {
  isMobile: boolean;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${({isMobile}) => (isMobile ? '100%' : '49%')};
  height: 100px;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Left = styled.View`
  width: 45%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Right = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px 0;
`;

export const Title = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  font-weight: bold;
  color: ${({theme}) => theme.text.primary};
  font-size: 16px;
`;

export const ExtraTextContailer = styled.View`
  flex-direction: row;
  gap: 9px;
`;

export const Seperator = styled.View`
  width: 1.5px;
  height: 80%;
  align-self: center;
  background-color: ${({theme}) => theme.text.secondary};
`;

type ExtraTextProps = {
  bold?: boolean;
  color?: 'main' | 'secondary' | 'custom';
  custom_color?: string;
};

export const ExtraText = styled(Text)<ExtraTextProps>`
  color: ${({theme, color, custom_color}) => {
    if (color === 'main') return theme.base.mainColor;
    if (color === 'secondary') return theme.text.secondary;
    if (color === 'custom' && custom_color) return custom_color;
    return theme.text.secondary;
  }};
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;
