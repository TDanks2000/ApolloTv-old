import {css, styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

type Props = {
  show: boolean;
};

export const PageIndicatorContainer = styled.View<Props>`
  ${({show}) =>
    !show &&
    css`
      display: none;
    `}
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

// export const PageIndicatorTextInput = styled.TextInput`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   color: white;
//   font-family: ${({theme}) => theme.text.fonts.NunitoSans};
//   font-size: 17px;
//   font-weight: bold;
// `;

export const PageIndicatorText = styled(Text)`
  font-weight: bold;
`;
