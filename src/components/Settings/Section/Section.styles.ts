import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 5px 0;

  gap: 2px;
`;

export const Title = styled(Text)`
  font-size: 17px;
  color: ${({theme}) => theme.text.offWhite};
`;

export const Description = styled(Text)`
  font-size: 13px;
  color: ${({theme}) => theme.text.secondary};
`;
