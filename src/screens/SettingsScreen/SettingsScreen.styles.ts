import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';

export const Title = styled(Text)`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Seperator = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({theme}) => rgba(theme.text.secondary, 0.5)};
  margin: 15px 0;
`;

export const BottomInfo = styled.View`
  margin-top: 25px;
`;

export const BottomImageContaoner = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BottomImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 150px;
  height: 100px;
`;
