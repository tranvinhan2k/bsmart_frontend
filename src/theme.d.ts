// import '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    miSmartOrange: PaletteColorOptions;
    miSmartWhite: PaletteColorOptions;
  }
  interface PaletteOptions {
    miSmartOrange: PaletteColorOptions;
    miSmartWhite: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    miSmartOrange: true;
    miSmartWhite: true;
  }
}
