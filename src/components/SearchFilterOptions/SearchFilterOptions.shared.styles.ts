import styled from 'styled-components/native';

export const TextBoxContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
  width: 65px;
`;

export const TextInput = styled.TextInput.attrs(({theme}) => ({
  cursorColor: theme.base.mainColor,
  textAlign: 'center',
}))`
  padding: 0 10px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  border-radius: 8px;
  color: white;

  flex-direction: row;
`;
