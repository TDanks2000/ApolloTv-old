import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) => theme.spacing.paddingLeft};
`;

type WrapperProps = {
  isMobile: boolean;
};

export const Wrapper = styled.View<WrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({isMobile}) =>
    isMobile ? 'space-between' : 'flex-start'};
  gap: ${({isMobile}) => (isMobile ? '0' : '30px')};
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
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  font-size: 14px;
`;
