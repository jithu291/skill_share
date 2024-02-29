import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/Images/login.png'
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
              <div className='bg-image '>
      <div class='round-div2 d-flex align-items-center justify-content-center me-4'>
      <i class="fa-solid fa-user  " style={{fontSize:'50px',color:'white'}}></i>
      </div>

      <div className='color-div row rounded shadow p-5 ' style={{ width: '40%', height: '65%' }}>
       
        <div className=' mt-3 '>
          
          <Form className='mt-4'>
          <div class="form-floating mb-3 d-flex" >
              <div className='user  rounded  shadow' style={{height:'58px', width:'40px',color:'white' }}><i class="fa-solid fa-user " style={{marginTop:'22px',marginLeft:'10px'}}></i></div>
              <input style={{backgroundColor:"darkgray"}} type="text" className="form-control border rounded shadow " id=" floatingInput" placeholder="Username" />
              <label for="floatingInput"className='ms-5 '  > Username</label>
            </div>
            <div class="form-floating mb-3 d-flex" >
              <div className='user  rounded  shadow' style={{height:'58px', width:'40px',color:'white' }}><i class="fa-solid fa-envelope " style={{marginTop:'22px',marginLeft:'10px'}}></i></div>
              <input style={{backgroundColor:"darkgray"}} type="email" className="form-control border rounded shadow " id=" floatingInput" placeholder="name@example.com" />
              <label for="floatingInput"className='ms-5 '  >Email address</label>
            </div>
            <div class="form-floating d-flex">
             <div className='user  rounded  shadow' style={{height:'58px', width:'40px',color:'white' }}><i class="fa-solid fa-lock " style={{marginTop:'22px',marginLeft:'10px'}}></i></div>
              <input style={{backgroundColor:"darkgray"}} type="password" class="form-control border rounded shadow" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword" className='ms-5 '>Password</label>
            </div> 
            <div className='mt-3'>
              <p>Already have an account?  <Link to={'/login'}>Login</Link>  </p>
            </div>
          </Form>
        </div>

      </div>
      <div className='reg-div  shadow rounded ' style={{backgroundColor:'darkgray'}}>
        <Link to={''} className='btn d-flex justify-content-evenly'>Register</Link>
      </div>

    </div>
        </>
    )
}

export default Register