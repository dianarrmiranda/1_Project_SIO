import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StorePage from './components/pages/StorePage'
import HomePage from './components/pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/store' element={<StorePage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
