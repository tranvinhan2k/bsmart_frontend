//React
import { Route, Routes } from 'react-router-dom'

//features
import { Main } from '@/routes'

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
    </Routes>
  )
}
