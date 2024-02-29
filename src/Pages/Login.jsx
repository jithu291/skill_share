import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/Images/login-illu.png'
import { Link } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';

function Login() {
  return (
    <div className='bg-image '>
      <div class='round-div d-flex align-items-center justify-content-center'>
      <i class="fa-solid fa-user  " style={{fontSize:'50px',color:'white'}}></i>
      </div>

      <div className='color-div row rounded shadow p-5 ' style={{ width: '40%', height: '55%' }}>
       
        <div className=' mt-3 '>
          
          <Form className='mt-4'>
            <div class="form-floating mb-3 d-flex" >
              <div className='user border rounded  shadow' style={{height:'58px', width:'40px',color:'white' }}><i class="fa-solid fa-user " style={{marginTop:'22px',marginLeft:'10px'}}></i></div>
              <input style={{backgroundColor:"darkgray"}} type="email" className="form-control border rounded shadow " id=" floatingInput" placeholder="name@example.com" />
              <label for="floatingInput"className='ms-5 '  >Email address</label>
            </div>
            <div class="form-floating d-flex">
             <div className='user border rounded  shadow' style={{height:'58px', width:'40px',color:'white' }}><i class="fa-solid fa-lock " style={{marginTop:'22px',marginLeft:'10px'}}></i></div>
              <input style={{backgroundColor:"darkgray"}} type="password" class="form-control border rounded shadow" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword" className='ms-5 '>Password</label>
            </div> 
            <div className='mt-3'>
              <p>Don't have an Account?  <Link to={'/register'}>Register</Link>  </p>
            </div>
          </Form>
        </div>

      </div>


    </div>
  )
}

export default Login