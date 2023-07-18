import {BackButton} from './../../modals/EpisodesModal/EpisodesModal.styles';
import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
  justify-content: center;
  align-items: center;
`;

export const BottomImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 150px;
  height: 45px;
`;

export const VersionInfo = styled.View``;

export const VersionNumber = styled(Text)`
  font-size: 17px;
  font-weight: bold;
`;

export const Disclaimer = styled(Text)`
  width: 100%;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;

export const SocialWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  gap: 20px;
`;

export const SocialIconWrapper = styled.TouchableOpacity``;

export const Social = styled(Icon)`
  color: ${({theme}) => theme.text.primary};
  font-size: 26px;
`;
