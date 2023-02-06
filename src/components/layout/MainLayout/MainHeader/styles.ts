import { Stack } from '@mui/material'

import { StyledProps } from '@/models'

import { styled } from '@mui/system'

export const StyledHeaderContainer = styled(Stack)(({ theme }: StyledProps) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme?.metricSizes.medium,
  background: theme?.customBackground.navy,
  color: theme?.customTextColor.grey,
}))
