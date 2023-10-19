import {rgba} from 'polished';
import styled from 'styled-components/native';

export const Title = styled.View`
  width: 150px;
  height: 20px;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
  border-radius: 8px;
`;
