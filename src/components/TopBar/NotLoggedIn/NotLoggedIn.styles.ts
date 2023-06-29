import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.View``;

export const Button = styled.TouchableOpacity`
  padding: 5px 15px;
  background-color: ${({theme}) => theme.base.mainColor};
  border-radius: 8px;
`;

export const ButtonText = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
`;
