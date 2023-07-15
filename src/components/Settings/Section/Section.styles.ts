import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 5px 0;

  gap: 2px;

  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 17px;
  color: ${({theme}) => theme.text.offWhite};
`;

export const Description = styled(Text)`
  font-size: 13px;
  color: ${({theme}) => theme.text.secondary};
`;

export const LeftContainer = styled.View`
  width: 79%;
`;

export const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SelectedOption = styled(Text)`
  font-size: 14px;
  color: ${({theme}) => theme.text.secondary};
`;
