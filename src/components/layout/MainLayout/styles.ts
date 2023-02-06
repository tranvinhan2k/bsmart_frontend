import { Stack, styled } from '@mui/material'

import { StyledProps } from '@/models'

export const StyledBodyContainer = styled(Stack)(({ theme }: StyledProps) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme?.metricSizes.medium,
  background: theme?.customBackground.white,
}))
