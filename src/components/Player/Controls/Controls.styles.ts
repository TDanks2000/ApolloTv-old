import Icon from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  shouldShow: boolean;
}

interface HiddenProps {
  hidden?: boolean;
}

export const Wrapper = styled.View`
  position: absolute;
  inset: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Container = styled.View<Props>`
  opacity: ${({shouldShow}) => (!shouldShow ? 1 : 0)};
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Button = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.55);
  width: 55px;
  height: 55px;
  border-radius: 9999px;

  justify-content: center;
  align-items: center;
  z-index: 200;
`;

export const ButtonIcon = styled(Icon)`
  color: white;
  font-size: 23px;
`;

export const Top = styled(LinearGradient).attrs<HiddenProps>({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  padding: 15px;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;

  ${({hidden}) =>
    hidden &&
    `
    pointer-events: none;
  `}
`;

export const TopTextContainer = styled.View`
  flex: 1;
`;

type TopTextProps = {
  weight?: 'bold' | 'normal' | 'light';
};

export const TopText = styled(Text)<TopTextProps>`
  font-weight: ${({weight}) => weight ?? 'normal'};
  font-size: 15px;
`;

export const Middle = styled.View<HiddenProps>`
  position: relative;
  z-index: 1;
  /* flex: 1; */
  width: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;

  ${({hidden}) =>
    hidden &&
    `
    pointer-events: none;
  `}
`;

export const Bottom = styled(LinearGradient).attrs<HiddenProps>({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 30px 15px;
  height: 150px;
  justify-content: flex-end;

  ${({hidden}) =>
    hidden &&
    `
    pointer-events: none;
  `}
`;

export const ClickToDismiss = styled.Pressable`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const TopRight = styled.View`
  position: relative;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const IconBase = styled(Icon)`
  color: white;
  font-size: 20px;
`;
export const IconBase6 = styled(Icon6)`
  color: white;
  font-size: 20px;
`;
