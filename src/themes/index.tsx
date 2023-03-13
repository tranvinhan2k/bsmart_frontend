import { createTheme } from '@mui/material';
import { Color } from '~/assets/variables';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: Color.orange,
    },
  },
});

export default defaultTheme;
