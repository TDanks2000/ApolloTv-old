import Icon from 'react-native-vector-icons/FontAwesome';
import {rgba} from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) => theme.spacing.paddingLeft};
`;

export const TopContainer = styled.View`
  width: 100%;
  margin-bottom: ${({theme}) => theme.spacing.paddingBottom};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 999px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackButtonIcon = styled(Icon)`
  color: white;
  font-size: 20px;
`;

export const Title = styled.Text`
  padding-right: ${({theme}) => theme.spacing.paddingRight};
  color: white;
  font-size: 20px;

  font-weight: bold;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const EpisodesWrapper = styled.View`
  gap: 20px;
`;
