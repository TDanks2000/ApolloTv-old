import {styled} from 'styled-components/native';
import {BaseToast} from 'react-native-toast-message';

export const BaseToastComponent = styled(BaseToast).attrs(({theme}) => ({
  text1Style: {
    color: 'white',
    fontFamily: theme.text.fonts.NunitoSans,
    fontSize: 14,
    paddingBottom: 1,
  },
  text2Style: {
    fontFamily: theme.text.fonts.NunitoSans,
    color: theme.text.secondary,
    fontSize: 12,
  },
  text1NumberOfLines: 1,
  text2NumberOfLines: 1,
  contentContainerStyle: {},
}))`
  background: ${({theme}) => theme.base.offDarkBg};
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: ${({theme}) => theme.base.mainColor};

  padding: 10px 5px;

  margin: -10px;
`;

export const ErrorToast = styled(BaseToastComponent)`
  border-left-color: ${({theme}) => theme.text.danger};
`;

export const InfoToast = styled(BaseToastComponent)`
  border-left-color: ${({theme}) => theme.text.warning};
`;
