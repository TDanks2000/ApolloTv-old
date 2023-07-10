import {rgba} from 'polished';
import {styled} from 'styled-components/native';

export const Buffering = styled.ActivityIndicator.attrs(({theme}) => ({
  size: 35,
  color: theme.text.primary,
  // color: rgba(theme.base.mainColor, 0.7),
}))``;
