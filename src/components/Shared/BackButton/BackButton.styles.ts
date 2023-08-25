import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';

export const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 999px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackButtonIcon = styled(Icon)`
  color: white;
  font-size: 19px;
`;
