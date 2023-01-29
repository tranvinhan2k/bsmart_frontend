import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Typography>Bsmart</Typography>} />
    </Routes>
  )
}
