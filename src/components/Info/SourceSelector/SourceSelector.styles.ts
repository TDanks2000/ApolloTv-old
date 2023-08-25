import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: 0 ${({theme}) => theme.spacing.paddingLeft};
  padding-bottom: ${({theme}) => theme.spacing.paddingLeft};
`;
