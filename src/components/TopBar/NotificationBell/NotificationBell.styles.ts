import {styled} from 'styled-components/native';

export const IconItemContainer = styled.TouchableOpacity`
  position: relative;
`;

export const NotificationStatus = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: ${({theme}) => theme.base.mainColor};
  border-radius: 9999px;
  overflow: hidden;
  border: 2px solid #0f0f0f;
`;
