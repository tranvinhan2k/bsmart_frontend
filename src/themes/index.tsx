import { createTheme } from '@mui/material'
// Models
import { CustomThemeProps } from '../models'

const defaultTheme = createTheme({
  palette: {
    background: {
      paper: '#040825',
    },
    action: {
      hover: 'linear-gradient(180deg, #60EBEB 0%, #6BA8F6 65.04%, #6F87F9 100%)',
    },
    primary: {
      main: '#60ebeb',
    },
    text: {
      primary: '#000000',
    },
    common: {
      white: '#ffffff',
      black: '#0F1B1F',
    },
  },
  typography: {
    fontFamily: 'Roboto-Regular',
  },
})

const Theme: CustomThemeProps = {
  fontFamilies: {
    fontFamily: 'Roboto-Regular',
    fontFamilyLight: 'Roboto-Light',
    fontFamilyBold: 'Roboto-Bold',
    fontFamilyMedium: 'Roboto-Medium',
    fontFamilyThin: 'Roboto-Thin',
  },

  metricSizes: {
    small: '10px',
    medium: '20px',
    large: '30px',
  },
  input: {
    borderColor: '#000000',
  },
  customTextColor: {
    note: '#321745',
    specialNote: '#E33BE6',
    grey: '#CACFED',
  },
  customButton: {
    background: 'linear-gradient(180deg, #60EBEB 0%, #6BA8F6 65.04%, #6F87F9 100%)',
    borderRadius: '4px',
  },
  customBackground: {
    white: '#ffffff',
    navy: '#0e0a38',
  },
  customTextWidth: {
    title: '80%',
    subtitle: '80%',
  },
  customConnector: {
    background: 'linear-gradient(180deg, #60EBEB 0%, #6BA8F6 65.04%, #6F87F9 100%)',
  },
  ...defaultTheme,
}

export default Theme
