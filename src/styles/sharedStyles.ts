import {styled} from 'styled-components/native';
import {Platform} from 'react-native';

export const ScrollView = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: Platform.isTV ? 25 : 100,
  },
})``;

export const ModalContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.base.darkBg};
`;

export const SharedContainer = styled.View`
  margin: 25px ${({theme}) => theme.spacing.paddingLeft};
  overflow: hidden;
`;

export const SharedContainerRel = styled(SharedContainer)`
  position: relative;
`;

export const Text = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  font-size: 16px;
`;

export const Title = styled(Text)`
  font-size: 19px;
`;

export const RefreshControlStyled = styled.RefreshControl.attrs(({theme}) => ({
  colors: [theme.base.mainColor],
  progressBackgroundColor: 'rgba(0,0,0,0.5)',
}))``;
