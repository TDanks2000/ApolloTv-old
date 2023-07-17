import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

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

export const OptionContainer = styled.View`
  position: relative;
`;

export const OptionWrapper = styled.TouchableOpacity`
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

type DropDownProps = {
  isOpen: boolean;
};

export const OptionDropDown = styled.View<DropDownProps>`
  position: absolute;
  width: 140px;
  height: ${({isOpen}) => (isOpen ? 'auto' : '0')};
  background: ${({theme}) => theme.base.offDarkBg};
  left: 0;
  top: 70px;
  border-radius: 8px;
  overflow: hidden;
  /* padding: 10px 5px; */
  z-index: 1;

  flex-direction: column;
`;

type OptionProps = {
  active?: boolean;
};

export const OptionDropDownItem = styled.TouchableOpacity<OptionProps>`
  width: 100%;
  background: ${({theme, active}) =>
    active
      ? rgba(theme.base.mainColor, 0.15)
      : rgba(theme.text.secondary, 0.05)};
  padding: 10px 7px;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const OptionDropDownItemText = styled(Text)`
  text-transform: capitalize;
  font-size: 15px;
`;
