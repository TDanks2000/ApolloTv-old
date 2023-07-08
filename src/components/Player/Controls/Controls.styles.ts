import Icon from 'react-native-vector-icons/FontAwesome5';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  shouldShow: boolean;
}

export const Container = styled.View<Props>`
  opacity: ${({shouldShow}) => (!shouldShow ? 1 : 0)};
  position: absolute;
  inset: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Button = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.2);
  width: 55px;
  height: 55px;
  border-radius: 9999px;

  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled(Icon)`
  color: white;
  font-size: 23px;
`;

export const Top = styled(LinearGradient).attrs({
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

export const Middle = styled.View`
  position: relative;
  z-index: 1;
  /* flex: 1; */
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const Bottom = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 30px 15px;
  height: 150px;
  justify-content: flex-end;
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
`;

export const SettingsCog = styled(Icon)`
  color: white;
  font-size: 20px;
`;
