import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/Images/login-illu.png'
import { Link, useNavigate } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Login() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,
        password: password
      });
      const { token } = response.data
      sessionStorage.setItem('token', token)
      console.log('Login successful:', response.data);
      toast.success(`Welcome Back "${username}"`)
      setTimeout(() => {

        navigate('/landing')
      }, 2000)




      // Optionally, you can save the access token to local storage or session storage for future authenticated requests
    } catch (error) {
      console.error('Login failed:', error.response.data);
      toast.error('Login Failed, Please check your credentials again!')
    }
  };


  return (
    <div className='bg-image '>
      <div class='round-div d-flex align-items-center justify-content-center me-4'>
        <i class="fa-solid fa-user  " style={{ fontSize: '50px', color: 'white' }}></i>
      </div>

      <div className='color-div row rounded shadow p-5 ' style={{ width: '40%', height: '55%' }}>

        <div className=' mt-3 '>

          <Form onSubmit={handleSubmit} className='mt-4'>
            <div class="form-floating mb-3 d-flex" >
              <div className='user border rounded  shadow' style={{ height: '58px', width: '40px', color: 'white' }}><i class="fa-solid fa-envelope " style={{ marginTop: '22px', marginLeft: '10px' }}></i></div>
              <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ backgroundColor: "darkgray" }} type="text" className="form-control border rounded shadow " id=" floatingInput" placeholder="name@example.com" />
              <label for="floatingInput" className='ms-5 '  >Username</label>
            </div>
            <div class="form-floating d-flex">
              <div className='user border rounded  shadow' style={{ height: '58px', width: '40px', color: 'white' }}><i class="fa-solid fa-lock " style={{ marginTop: '22px', marginLeft: '10px' }}></i></div>
              <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: "darkgray" }} type="password" class="form-control border rounded shadow" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword" className='ms-5 '>Password</label>
            </div>
            <div className='mt-3'>
              <p>Don't have an Account?  <Link to={'/register'}>Register</Link>  </p>
            </div>
            <div className='log-div d-flex justify-content-evenly shadow rounded ' style={{ backgroundColor: 'darkgray' }}>
              <Button type="submit" variant='' className='btn '>Login</Button>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose='2000' />
    </div>
  )
}

export default Login