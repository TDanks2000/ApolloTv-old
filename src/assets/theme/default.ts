import {DefaultTheme} from 'styled-components/native';

export const defaultTheme: DefaultTheme = {
  base: {
    mainColor: '#7d5fff',
    SecondColor: '#fff',

    bg: '#1f2429',
    navBg: '#141414',
    darkBg: '#0f0f0f',
    offDarkBg: '#212121',
    gold: '#FFDF00',
  },
  spacing: {
    paddingBottom: '25px',
    paddingTop: '25px',
    paddingRight: '25px',
    paddingLeft: '25px',
  },
  text: {
    primary: '#fff',
    secondary: '#969695',
    offWhite: '#dbdbdb',

    warning: '#f57c00',
    success: '#388e3c',
    confused: '#ab47bc',
    danger: '#eb2f06',
    fonts: {
      NunitoSans: 'NunitoSans_10pt-Regular',
    },
  },
};
