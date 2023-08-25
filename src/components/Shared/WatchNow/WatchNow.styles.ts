import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';

export const WatchNowButton = styled.TouchableOpacity`
  position: relative;
  background-color: rgba(0, 0, 0, 1);
  padding: 10px 18px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 180px;
`;

export const WatchNowButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const WatchNowIcon = styled(Icon).attrs({
  name: 'play-circle-o',
})`
  font-size: 18px;
  color: white;
`;
