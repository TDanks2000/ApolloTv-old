import {css, styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const TouchableOpacity = styled.Pressable``;

export const PangeChangeContainer = styled.View`
  position: absolute;
  bottom: 30px;
  right: 7.5%;
  flex-direction: row;
  gap: 15px;
  z-index: 2;
`;

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
