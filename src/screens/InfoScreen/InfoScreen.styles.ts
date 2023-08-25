import {styled} from 'styled-components/native';
import {SharedContainer} from '../../styles/sharedStyles';

export const Wrapper = styled(SharedContainer)`
  margin: 25px 0;
  overflow: hidden;
`;

type CWWrapperProps = {
  isMobile: boolean;
};

export const CWWrapper = styled.View<CWWrapperProps>`
  ${({isMobile}) =>
    !isMobile
      ? `
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `
      : null}
`;
