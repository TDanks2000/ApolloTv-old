import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.TouchableOpacity`
  width: 130px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.54)'],
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

export const RatingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const Title = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: white;
  text-align: center;
`;

export const SubTitle = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: 3px;
  font-size: 14px;
  width: 100%;
  color: ${({theme}) => theme.text.offWhite};
  text-align: center;
  text-transform: capitalize;
`;
