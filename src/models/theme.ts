import { Theme } from '@mui/material'

export interface CustomThemeProps extends Theme {
  fontFamilies: {
    fontFamily: string
    fontFamilyBold: string
    fontFamilyThin: string
    fontFamilyLight: string
    fontFamilyMedium: string
  }
  metricSizes: {
    small: string | number
    medium: string | number
    large: string | number
  }
  input: {
    borderColor: string
  }
  customTextColor: {
    note: string
    specialNote: string
    grey: string
  }
  customButton: {
    background: string
    borderRadius: string
  }
  customBackground: {
    white: string
    navy: string
  }
  customTextWidth: {
    title: string
    subtitle: string
  }
  customConnector: {
    background: string
  }
}
