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
