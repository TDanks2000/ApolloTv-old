import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Wrapper = styled.View`
  position: relative;
  width: 100%;
  padding: 5px 0;
`;

export const Container = styled.TouchableOpacity`
  position: relative;
  z-index: -1;
  gap: 2px;

  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 17px;
  color: ${({theme}) => theme.text.offWhite};
`;

export const Description = styled(Text)`
  font-size: 13px;
  color: ${({theme}) => theme.text.secondary};
`;

export const LeftContainer = styled.View`
  width: 77%;
`;

export const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SelectedOption = styled(Text)`
  font-size: 14px;
  color: ${({theme}) => theme.text.secondary};
  text-transform: uppercase;
`;

type DropDownProps = {
  isOpen: boolean;
};

export const Dropdown = styled.View<DropDownProps>`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 10;
  height: ${({isOpen}) => (isOpen ? 'auto' : '0')};
  pointer-events: ${({isOpen}) => (isOpen ? 'auto' : 'none')};
  display: ${({isOpen}) => (isOpen ? 'flex' : 'none')};
`;

export const DropdownComponent = styled.View`
  background: ${({theme}) => theme.base.offDarkBg};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 10px 15px;
  overflow: hidden;
  gap: 12px;
`;

type IsSelectedProp = {
  isSelected: boolean;
};

export const DropdownItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const DropdownItemTitle = styled(Text)<IsSelectedProp>`
  font-size: 14px;
  color: ${({isSelected, theme}) =>
    isSelected ? theme.base.mainColor : theme.text.primary};
`;
