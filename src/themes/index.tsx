import { createTheme } from '@mui/material';
import { Color, FontFamily } from '~/assets/variables';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: Color.navy,
    },
    secondary: {
      main: Color.tertiary,
    },

    miSmartOrange: {
      main: Color.tertiary,
      light: Color.tertiary,
      dark: Color.tertiary,
      contrastText: Color.white,
    },
    miSmartWhite: {
      main: Color.white,
      light: Color.white,
      dark: Color.white,
      contrastText: Color.black,
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
});

export default defaultTheme;
