import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Left = styled.View`
  width: 45%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Right = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px 0;
`;

export const Title = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-weight: bold;
  color: ${({theme}) => theme.text.primary};
  font-size: 17px;
`;

export const ExtraText = styled(Text)`
  color: ${({theme}) => theme.text.secondary};
`;
