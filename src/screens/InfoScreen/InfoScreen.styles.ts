import {styled} from 'styled-components/native';
import {SharedContainer} from '../../styles/sharedStyles';

export const Wrapper = styled(SharedContainer)`
  margin: ${({theme}) => theme.spacing.paddingLeft};
  overflow: hidden;
`;
