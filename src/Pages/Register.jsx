import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import loginImg from '../assets/Images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    if (!username || !email || !password) {
      // Display toast if the form is not filled
      toast.error('Please fill the form');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: username,
        email: email,
        password: password
      });
      console.log(response.data);
      console.log('Registration successful:', response.data);
      toast.success(`Account created for ${username}`);
      // Store token in local storage 
      // sessionStorage.setItem('token', response.data.token);
      // console.log(token);
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration failed:', error.response);
    }
  };

  return (
    <>
      <div className='bg-image '>
        <div class='round-div2 d-flex align-items-center justify-content-center me-4'>
          <i class="fa-solid fa-user  " style={{ fontSize: '50px', color: 'white' }}></i>
        </div>

        <div className='color-div row rounded shadow p-5 ' style={{ width: '40%', height: '65%' }}>

          <div className=' mt-3 '>

            <Form className='mt-4' onSubmit={handleSubmit} >
              <div class="form-floating mb-3 d-flex" >
                <div className='user  rounded  shadow' style={{ height: '58px', width: '40px', color: 'white' }}><i class="fa-solid fa-user " style={{ marginTop: '22px', marginLeft: '10px' }}></i></div>
                <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ backgroundColor: "darkgray" }} type="text" className="form-control border rounded shadow " id=" floatingInput" placeholder="Username" />
                <label for="floatingInput1" className='ms-5 '  > Username</label>
              </div>
              <div class="form-floating mb-3 d-flex" >
                <div className='user  rounded  shadow' style={{ height: '58px', width: '40px', color: 'white' }}><i class="fa-solid fa-envelope " style={{ marginTop: '22px', marginLeft: '10px' }}></i></div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: "darkgray" }} type="email" className="form-control border rounded shadow " id=" floatingInput" placeholder="name@example.com" />
                <label for="floatingInput2" className='ms-5 '  >Email address</label>
              </div>
              <div class="form-floating d-flex">
                <div className='user  rounded  shadow' style={{ height: '58px', width: '40px', color: 'white' }}><i class="fa-solid fa-lock " style={{ marginTop: '22px', marginLeft: '10px' }}></i></div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: "darkgray" }} type="password" class="form-control border rounded shadow" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword" className='ms-5 '>Password</label>
              </div>
              <div className='mt-3'>
                <p>Already have an account?  <Link to={'/login'}>Login</Link>  </p>
              </div>
              <div className='reg-div d-flex justify-content-center  shadow rounded ' style={{ backgroundColor: 'darkgray' }}>
                {/* Register button with spinner */}
                <Button variant='' type="submit" className='btn' disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    'Register'
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <ToastContainer />

    </>
  )
}

export default Register