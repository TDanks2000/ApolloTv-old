import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const NavBarContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100000000;
`;

export const NavBarWrapper = styled.View`
  background: ${({theme}) => theme.base.offDarkBg};
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 0 15px;
`;

interface NavBarIconProps {
  isFocused?: boolean;
}

export const NavBarItem = styled.TouchableOpacity<NavBarIconProps>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme, isFocused}) =>
    !isFocused ? 'transparent' : theme.base.mainColor};
  padding: ${({isFocused}) => (isFocused ? '6px 15px' : '0')};
  border-radius: 20px;
`;

export const NavBarIcon = styled(Icon)<NavBarIconProps>`
  font-size: 23px;
  color: ${({theme, isFocused}) => (!isFocused ? theme.text.primary : 'black')};
`;

export const NavBarText = styled.Text`
  font-size: 15px;
  color: black;
  /* font-weight: bold; */
  font-family: ${({theme}) => theme.text.fonts.openSans.bold};
`;
