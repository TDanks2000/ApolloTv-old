import {styled} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {rgba} from 'polished';
import {Animated} from 'react-native';

export const Container = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  outline: 1px solid red;
  margin: 0 20px;
`;

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
`;

export const ProfileImage = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;

export const ProfileTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10px;
  gap: 10px;
`;

export const ProfileText = styled.View`
  width: 55px;
  height: 12px;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;

export const SubProfileText = styled(ProfileText)`
  width: 100px;
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
  color: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;
