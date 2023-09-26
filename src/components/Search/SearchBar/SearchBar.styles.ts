import {styled} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export const Container = styled.View`
  width: 100%;
  height: 45px;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export const FilterOptions = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  height: 100%;
`;

export const FilterOption = styled(Icon)`
  font-size: 16px;
  color: white;
`;

export const TextInput = styled.TextInput.attrs(({theme}) => ({
  cursorColor: theme.base.mainColor,
}))`
  background-color: rgba(255, 255, 255, 0.1);
  flex: 1;
  height: 100%;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  border-radius: 8px;
  padding: 5px 10px;
  color: white;
`;
