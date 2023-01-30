import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

//Theme
import Theme from '@/themes'
//Mui Library
import { LinearProgress, ThemeProvider } from '@mui/material'
//components
import { MainLayout } from '@/components'
//features
import MainHome from '../../pages/MainHome'

export default function Main() {
  return (
    <ThemeProvider theme={Theme}>
      <MainLayout>
        <Suspense fallback={<LinearProgress />}>
          {/* //TODO: Relate an LinearProgress */}
          <Routes>
            <Route index element={<Navigate to="homepage" />} />
            <Route path="homepage" element={<MainHome />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}
