import styled from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

type Props = {
  backgroundColor?: string;
};

export const Container = styled.View<Props>`
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ?? theme.base.mainColor};
  width: 100%;
  height: 25px;

  justify-content: center;
  align-items: center;
`;

export const ActionBarText = styled(Text)``;
