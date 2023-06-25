import {styled} from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 100,
  },
})``;

export const ModalContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.base.darkBg};
`;

export const SharedContainer = styled.View`
  margin: 20px ${({theme}) => theme.spacing.paddingLeft};
  overflow: hidden;
`;

export const Text = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  font-size: 16px;
`;
