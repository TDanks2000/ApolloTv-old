import {styled} from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 5px;
`;

export const TextInput = styled.TextInput.attrs(({theme}) => ({
  cursorColor: theme.base.mainColor,
}))`
  width: 100%;
  height: 100%;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  color: white;
`;
