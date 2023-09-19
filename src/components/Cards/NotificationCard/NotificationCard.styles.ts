import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

export const MainContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  height: 70px;
  overflow: hidden;
`;

export const LeftContainer = styled.View`
  width: 50px;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const RightContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;
`;

export const NotificationImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const NotificationTitle = styled(Text)`
  color: ${({theme}) => theme.text.offWhite};
  font-size: 12px;
  width: 100%;
  text-transform: capitalize;
`;

export const NotificationDesc = styled(Text)`
  color: ${({theme}) => theme.text.primary};
  font-size: 15px;
  width: 100%;
`;
