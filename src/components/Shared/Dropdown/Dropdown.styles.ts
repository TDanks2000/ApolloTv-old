import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${({theme}) => theme.text.secondary};
  /* height: 40px; */
  width: 100%;
  padding: 7px 15px;
  z-index: 1;
  border-radius: 8px;
`;

export const ButtonText = styled(Text)`
  flex: 1;
  text-align: center;
  color: black;
  font-weight: bold;
`;

export const ButtonImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ButtonImageContainer = styled.View`
  left: 0;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  overflow: hidden;
`;

type Props = {
  width: number;
};

export const DropdownContainer = styled(Text)<Props>`
  position: absolute;
  flex: 1;
  width: ${props => props.width}px;
  margin-top: 10px;
  background: ${({theme}) => rgba(theme.text.secondary, 0.85)};
  border-radius: 8px;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Item = styled.TouchableOpacity`
  position: relative;
  padding: 10px 15px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const ItemText = styled(Text)`
  text-align: left;
  flex: 1;
  width: 100%;
  text-transform: capitalize;
  color: black;
  font-weight: 700;
  font-size: 15px;
`;

export const ItemImageContainer = styled.View`
  left: 0;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  overflow: hidden;
`;

export const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const DropdownSeperator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
`;
