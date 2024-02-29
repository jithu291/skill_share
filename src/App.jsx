
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Pages/Header'
import HomePage from './Pages/HomePage'



function App() {


  return (
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/header' element={<Header/>}/>
  <Route path='/home' element={<HomePage/>}/>
</Routes>

  )
}

export default App
