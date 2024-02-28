import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/Images/login.png'

function Login() {
  return (
    <div className='bg-image'>
        <div className='color-div row border rounded shadow p-5 ' style={{ width:'80%', height:'70%'}}>
    <div className='col-lg-6 ' >
        <h1 className='text-center' style={{marginTop:'-35px'}} >Welcome <span style={{color:'red'}}>Back</span> </h1>
        <img className='mt-4' style={{height:'90%', width:'100%'}} src={loginImg} alt="" />
    </div>
    <div className='col-lg-6 mt-3 '>
        <h2 className='text-center' >Login Form</h2>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="floatingEmail" placeholder="Enter email" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="floatingPassword" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div>
        <p>Don't have an Account?  <a href="">Register</a>  </p>
      </div>
    </Form>
    </div>

        </div>
    
       
    </div>
  )
}

export default Login