import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StorePage from './components/pages/StorePage'
import HomePage from './components/pages/HomePage'
import ProductPage from './components/pages/ProductPage'
import LoginPage from './components/pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/store' element={<StorePage/>} />
            <Route path='/store/product/:id' element={<ProductPage/>} />
            <Route path='/login' element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
