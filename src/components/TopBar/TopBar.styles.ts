import {styled} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  outline: 1px solid red;
  margin: 0 20px;
`;

export const ProfileContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
`;

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 999px;
`;

export const ProfileTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  gap: -3px;
`;

interface TextProps {
  color?: string;
  isProfileName?: boolean;
}

export const ProfileText = styled.Text<TextProps>`
  color: ${({color}) => color ?? 'white'};
  font-size: 15px;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  font-weight: ${({isProfileName}) => (isProfileName ? 'bold' : 'normal')};
`;

export const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

export const IconItemContainer = styled.TouchableOpacity``;

export const IconItem = styled(Icon)`
  font-size: 18px;
  color: white;
`;
