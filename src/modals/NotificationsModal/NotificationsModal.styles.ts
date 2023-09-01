import {styled} from 'styled-components/native';

export const NotificationsContainer = styled.View`
  background-color: rgba(0, 0, 0, 1);
  width: 300px;
  min-height: 250px;
  position: absolute;
  right: 15px;
  top: 0;
  margin-top: 75px;
  border-radius: 8px;
  padding: 10px;
`;

export const NotificationsWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;
