import {css, styled} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  disabled: boolean;
};

export const PageChangeContainer = styled.TouchableOpacity`
  ${({disabled}) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  border-radius: 99999px;
`;

export const PageChangeIcon = styled(Icon)`
  color: ${({theme}) => theme.text.primary};
  font-size: 15px;
`;
