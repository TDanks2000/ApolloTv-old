import styled from 'styled-components/native';

export const Input = styled.TextInput.attrs(({theme}) => ({
  cursorColor: theme.base.mainColor,
}))`
  width: 40%;
  height: 25px;
  padding: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;
