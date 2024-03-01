
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Pages/Header'
import HomePage from './Pages/HomePage'
import './Landing.css'
import Landing from './Pages/Landing'
import './Profile.css'
import Profile from './Pages/Profile'




function App() {


  return (
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/header' element={<Header />}/>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/landing' element={<Landing/>}/>
  <Route path='/profile' element={<Profile/>}/>


</Routes>

  )
}

export default App
