import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 130px;
  height: 200px;
  background-color: ${({theme}) => theme.base.mainColor};

  border-radius: 8px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const RatingContainer = styled.View`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const RatingWrapper = styled(LinearGradient).attrs({
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

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: white;
  text-align: center;
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
`;
