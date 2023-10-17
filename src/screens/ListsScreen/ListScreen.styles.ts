import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Wrapper = styled.View`
  margin: 0 ${({theme}) => theme.spacing.paddingLeft};
`;

export const SelectorContainer = styled.View`
  padding-bottom: 15px;
`;

export const NoDataTextWrapper = styled.View`
  pointer-events: none;
  width: 100%;
  height: 93%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NoDataText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;

  font-size: 22px;
`;
