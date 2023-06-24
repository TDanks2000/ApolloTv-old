import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

interface ContainerProps {
  width: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({theme}) => theme.base.mainColor};
  width: ${({width}) => width}px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: 1},
  end: {x: 0, y: -0.3},
})`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 10px;
`;

export const Title = styled.Text`
  color: white;
  /* font-weight: bold; */
  font-size: 19px;
  width: 60%;

  font-family: ${({theme}) => theme.text.fonts.openSans.bold};
`;

export const RatingContainer = styled(LinearGradient).attrs({
  colors: ['rgba(255, 255, 255, .3)', 'rgba(0, 0, 0, .5)'],
  start: {x: 1.3, y: 0},
  end: {x: 0, y: 1},
})`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const RatingText = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
`;

export const RatingIcon = styled(Icon)`
  color: ${({theme}) => theme.base.gold};
`;

export const WatchNowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
