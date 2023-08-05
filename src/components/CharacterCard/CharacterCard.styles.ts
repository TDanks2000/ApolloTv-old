import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import LinearGradient from 'react-native-linear-gradient';
import {MediaTypes} from '../../@types';

export const Container = styled.TouchableOpacity`
  width: 130px;
  height: 200px;
  background-color: ${({theme}) => theme.base.mainColor};

  border-radius: 8px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type Props = {
  type?: MediaTypes;
};

export const Wrapper = styled(LinearGradient).attrs<Props>({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 100%;
  height: 100%;

  justify-content: ${({type}) =>
    type === 'MANGA' ? 'flex-end' : 'space-between'};
  padding: 8px;
  align-items: center;
`;

export const TopContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const BottomContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const VoiceActorImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
`;

export const CharacterName = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  color: ${({theme}) => theme.text.primary};
  font-weight: bold;
`;

export const ActorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: 13px;
  color: ${({theme}) => theme.text.offWhite};
`;
