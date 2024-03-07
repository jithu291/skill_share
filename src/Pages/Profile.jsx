import React, { useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import profile from '../assets/Images/user2.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';


function Profile() {
  const [data, setData] = useState([])
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token)
      fetchData(token)
    }
  }, [])

  const fetchData = async (token) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/userprofile/", {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      setData(response.data)
      console.log("api fetching sccessfull");
    } catch (err) {

      console.log('error in fetchin data', err);
    }
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>


      <div>
        {data.map((item, index) => (
          <div className=' row ' id='row' style={{ width: '100vw' }} key={index}>
            <div className=' menu col-lg-1 shadow ' style={{ height: '592px' }}>
              <h2 style={{ marginLeft: '120px', width: '260px' }} className='mt-3' >welcome <span className='text-danger' style={{ fontWeight: 'bolder', fontSize: '40px' }}>{item.user} </span></h2>
              <div style={{ marginTop: '200px', marginLeft: '20px' }} >
                <Link to={'/landing'} className='d-flex gap-1' style={{ textDecoration: 'none', color: 'grey' }}><i class="fa-solid fa-house mt-1"></i><p>Home</p></Link>
              </div>

              <div style={{ marginTop: '6px', marginLeft: '20px' }} >
                <Link to={'/cart'} className='d-flex gap-1' style={{ textDecoration: 'none', color: 'grey' }}><i class="fa-solid fa-cart-shopping mt-1"></i><p>Cart</p></Link>
              </div>

            </div>


            <div className=' col-lg-8 rounded shadow d-flex flex-column align-items-center justify-content-center  mt-4 ' id='inptdiv' style={{ width: '40%', height: '90%', marginLeft: '300px' }}>

              <label style={{ marginTop: '-60px' }} >
                <input type="file" style={{ display: 'none' }} />
                <img src={profile} alt="profile" style={{ width: '200px', }} />
              </label>
              <div className='border rounded border-dark  w-50'>
                <p className='mt-1 text-center' >{item.user}</p>
              </div>
              <div className='border rounded border-dark  w-50 mt-4'>
                <p className='mt-1 text-center'>Name</p>
              </div>
              <div className='border rounded border-dark  w-50 mt-4'>
                <p className='mt-1 text-center'>Bio</p>
              </div>
              <div className='border rounded border-dark  w-50 mt-4'>
                <p className='mt-1 text-center'>Skills</p>
              </div>
              <div className='btn '>
                <Button variant="primary" className='shadow d-flex gap-1 mt-3' style={{ marginLeft: '0rem', marginBottom: '-60px', height: '40px' }} onClick={handleShow}>
                  <p>Edit </p> <FaUserEdit className='mt-1' />
                </Button>
              </div>
            </div>

          </div>
        ))}



      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: '180px', fontSize: '30px', fontFamily: "Cormorant,seriff " }}>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <FloatingLabel
            controlId="floatingTextarea"
            label="Name"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Name" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Bio">
            <Form.Control
              as="textarea"
              placeholder="Bio"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Skills"
            className="mt-3"
          >
            <Form.Control as="textarea" placeholder="Skills" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile




{/* <div className='inputDiv w-100' style={{marginLeft:'0.2rem'}}>
         <FloatingLabel
            controlId="floatingTextarea"
            label="Username"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Username" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Name"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Name" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Bio">
            <Form.Control
              as="textarea"
              placeholder="Bio"
              style={{ height: '80px' }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Skills"
            className="mt-3"
          >
            <Form.Control as="textarea" placeholder="Skills" />
          </FloatingLabel>
         </div> */}