import {css, styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
`;

export const TouchableOpacity = styled.Pressable``;

type Props = {
  show: boolean;
};

export const TopMetaInfo = styled.View<Props>`
  ${({show}) =>
    !show &&
    css`
      display: none;
    `}
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  z-index: 2;
`;

export const TopMetaTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 5px;
`;

export const TopMetaTitle = styled(Text)`
  font-size: 16px;
  color: ${({theme}) => theme.text.primary};
`;

export const TopMetaSubTitle = styled(Text)`
  font-size: 14px;
  color: ${({theme}) => theme.text.offWhite};
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 25px;
  width: 85%;
  position: relative;
  flex-direction: column;
  gap: 15px;
  z-index: 11;
  align-self: center;
`;

export const UnderSLider = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;

export const PangeChangeContainer = styled.View`
  flex-direction: row;
  gap: 15px;
  z-index: 2;
  align-self: flex-end;
`;

export const IconContainer = styled.TouchableOpacity``;
