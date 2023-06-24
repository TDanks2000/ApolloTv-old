import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) => theme.spacing.paddingLeft};
`;

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OptionContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const OptionIconContainer = styled.View`
  background: ${({theme}) => theme.base.offDarkBg};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  overflow: hidden;
`;

export const OptionIcon = styled(Icon)`
  color: white;
  font-size: 18px;
  margin-left: -1px;
`;

export const OptionText = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
  font-size: 14px;
`;
