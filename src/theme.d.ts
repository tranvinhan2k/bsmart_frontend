// import '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    miSmartOrange: PaletteColorOptions;
  }
  interface PaletteOptions {
    miSmartOrange: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    miSmartOrange: true;
  }
}
