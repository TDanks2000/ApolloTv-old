import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

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
