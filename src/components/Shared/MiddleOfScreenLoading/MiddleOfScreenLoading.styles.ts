import {styled} from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.base.mainColor,
  size: 60,
}))``;
