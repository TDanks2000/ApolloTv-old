import {rgba} from 'polished';
import {styled} from 'styled-components/native';

export const Seperator = styled.View`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: ${({theme}) => rgba(theme.text.secondary, 0.5)};
  margin: 15px 0;
  z-index: -1;
`;
