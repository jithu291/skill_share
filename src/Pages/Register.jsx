import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/Images/login.png'
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
            <div className='bg-image'>
                <div className='color-div row rounded shadow p-5 ' style={{ width: '80%', height: '70%' }}>
                    <div className='col-lg-6 ' >
                        <h1 className='text-center' style={{ marginTop: '-35px' }} >New <span style={{ color: 'red' }}>User?</span> </h1>
                        <img className='mt-2' style={{ height: '90%', width: '100%' }} src={loginImg} alt="" />
                    </div>
                    <div className='col-lg-6' >
                        <h3 className='text-center' >Register Now </h3>
                        <Form style={{marginTop:'-20px'}}>
                            <Form.Group className="mb-3" controlId="floatingEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="floatingEmail" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="floatingEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="floatingEmail" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="floatingPassword" placeholder="Password" />
                            </Form.Group>
                            <div> <h6>Already have an account? <Link to={'/login'}>Login</Link> </h6></div>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Register