import 'styled-components/native';
import {defaultTheme} from '../assets/theme/default';
type CustomTheme = typeof defaultTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {
    base: {
      mainColor: string;
      SecondColor: string;

      bg: string;
      navBg: string;
      darkBg: string;
      offDarkBg: string;
      gold: string;
    };
    text: {
      primary: string;
      secondary: string;
      offWhite: string;

      warning: string;
      success: string;
      confused: string;
      danger: string;
      font: {
        primary: string;
        secondary: string;
        semiBold: string;
      };
    };
  }
}
