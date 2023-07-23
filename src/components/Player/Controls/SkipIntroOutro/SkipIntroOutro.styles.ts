import {rgba} from 'polished';
import {Animated} from 'react-native';
import {styled} from 'styled-components/native';
import {Text} from '../../../../styles/sharedStyles';

type Props = {
  isHidden: boolean;
};

export const Container = styled.TouchableOpacity<Props>`
  height: 35px;
  width: 150px;
  position: absolute;
  bottom: ${({isHidden}) => (!isHidden ? '100px' : '25px')};
  right: 0;
  z-index: 101;
  margin: 0 15px;
`;

export const Wrapper = styled.View`
  border-radius: 8px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: ${({theme}) => rgba('black', 0.7)};
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TopAnimatedBackground = styled(Animated.View)`
  position: absolute;
  background: ${({theme}) => theme.base.mainColor};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Title = styled(Text)`
  color: white;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
`;
