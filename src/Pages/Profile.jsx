import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import profile from '../assets/Images/profile.jpg'
import { Link } from 'react-router-dom';


function Profile() {
  return (
    <>        
    

      <div className=' row ' style={{width:'100vw'}} >

    <div className=' menu col-lg-1 shadow ' style={{height:'592px'}}>
     
     <div style={{marginTop:'200px', marginLeft:'20px'}} >
      <Link to={'/landing'} className='d-flex gap-1' style={{textDecoration:'none', color:'grey'}}><i class="fa-solid fa-house mt-1"></i><p>Home</p></Link>
     </div>

     <div style={{marginTop:'6px', marginLeft:'20px'}} >
      <Link to={''} className='d-flex gap-1' style={{textDecoration:'none', color:'grey'}}><i class="fa-solid fa-cart-shopping mt-1"></i><p>Cart</p></Link>
     </div>
      
      </div>
     
      
    <div className='col-lg-4 border d-flex flex-column  align-items-center justify-content-center'>
<img src={profile} alt="profile" style={{width:'250px', marginTop:'-260px'}} />
    <div className='border rounded border-grey  w-50'>
    <p className='mt-1 text-center'>Username</p>
    </div>
    </div>
     
     <div className='col-lg-7 border'>

     </div>

      </div>
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