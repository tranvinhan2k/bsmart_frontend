import { createTheme } from '@mui/material';
import { Color, FontFamily } from '~/assets/variables';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: Color.orange,
    },
    miSmartOrange: {
      main: Color.orange,
      light: Color.orange,
      dark: Color.orange,
      contrastText: Color.white,
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
});

export default defaultTheme;
