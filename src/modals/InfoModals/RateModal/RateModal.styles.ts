import styled from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
`;

export const Container = styled.Pressable`
  background-color: black;
  border-radius: 10px;
  overflow: hidden;
  width: 130px;
  height: 120px;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const Title = styled(Text)``;

export const InputContainer = styled.View`
  flex-direction: row;
  margin: 0 15px;
  height: 60px;
  padding: 10px 15px;
`;

export const Input = styled.TextInput.attrs(({theme}) => ({
  cursorColor: theme.base.mainColor,
}))`
  width: 100%;
  height: 100%;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  padding: 5px 10px;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  border-radius: 8px;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  font-size: 20px;
`;

export const InputButtons = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  width: 25px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-left: 4px;
`;

export const InputButton = styled.TouchableOpacity`
  height: 50%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  disabled?: boolean;
};

export const InputButtonIcon = styled(Icon)<Props>`
  color: ${({theme, disabled}) => (disabled ? theme.text.secondary : 'white')};
  align-self: center;
`;

export const RateButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.1);
  width: 100px;
  border-radius: 8px;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
`;

export const RateButtonText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 1px;
`;
