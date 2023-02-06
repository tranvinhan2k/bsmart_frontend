import { Stack, styled } from '@mui/material'

import { StyledProps } from '@/models'

export const StyledNavigationContainer = styled(Stack)(({ theme }: StyledProps) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme?.metricSizes.medium,
  background: theme?.customBackground.white,
}))
