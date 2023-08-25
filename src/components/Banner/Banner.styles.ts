import {styled} from 'styled-components/native';

export const Container = styled.View`
  margin-right: 0;
`;

export const Wrapper = styled.FlatList``;

export const Circles = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 15px;
`;

export const Circle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background-color: white;
`;

export const SelectedCircle = styled(Circle)`
  background-color: ${({theme}) => theme.base.mainColor};
`;
