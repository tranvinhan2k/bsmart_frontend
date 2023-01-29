import { Route, Routes } from 'react-router-dom'
import Main from '@/features/Main'

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
    </Routes>
  )
}
