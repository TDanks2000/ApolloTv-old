import {styled} from 'styled-components/native';

export const CloseBG = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const NotificationsContainer = styled.Pressable`
  background-color: rgba(0, 0, 0, 1);
  width: 300px;
  min-height: 250px;
  position: absolute;
  right: 15px;
  top: 0;
  margin-top: 75px;
  border-radius: 8px;
  padding: 10px;
  z-index: 1;
`;

export const NotificationsWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;
