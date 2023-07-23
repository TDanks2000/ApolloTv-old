import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

type Props = {
  isCurrentEpisode: boolean;
};

export const Container = styled.TouchableOpacity<Props>`
  width: 93%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-radius: 8px;
  gap: 10px;
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
  justify-content: space-between;
  gap: 5px;
`;

export const Title = styled(Text).attrs<Props>({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-weight: bold;
  color: ${({theme, isCurrentEpisode}) =>
    isCurrentEpisode ? theme.base.mainColor : theme.text.primary};
  font-size: 16px;
`;

export const ExtraText = styled(Text)`
  color: ${({theme}) => theme.text.secondary};
  font-size: 15px;
`;
