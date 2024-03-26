
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Pages/Header'
import HomePage from './Pages/HomePage'
import './Landing.css'
import Landing from './Pages/Landing'
import Profile from './Pages/Profile'
import Cart from './Pages/Cart'
import Exam from './Pages/Exam'
import Bid1 from './Pages/Bid1'
import ChatPage from './Pages/ChatPage'




function App() {


  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/header' element={<Header  />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/exam' element={<Exam />} />
      <Route path='/bid' element={<Bid1/>} />
      <Route path='/chatpage' element={<ChatPage/>} />
    </Routes>

  )
}

export default App
