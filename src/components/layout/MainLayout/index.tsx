import { Stack } from '@mui/material'

import MainHeader from '../MainHeader'
import MainNavigationBar from '../MainNavigationBar'

interface MainLayoutProps {
  children: any
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack>
      <MainHeader />
      <MainNavigationBar />
      <Stack >{children}</Stack>
    </Stack>
  )
}
