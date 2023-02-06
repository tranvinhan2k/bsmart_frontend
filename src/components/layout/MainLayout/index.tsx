import { Stack } from '@mui/material'
import { StyledBodyContainer } from './styles'

import MainHeader from './MainHeader'
import MainNavigationBar from './MainNavigationBar'
import MainFooter from './MainFooter'

interface MainLayoutProps {
  children: any
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack>
      <MainHeader />
      <MainNavigationBar />
      <StyledBodyContainer>{children}</StyledBodyContainer>
      <MainFooter />

    </Stack>
  )
}
