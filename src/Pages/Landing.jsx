import React, { useEffect, useState } from 'react'
import Header from './Header'
import Card from 'react-bootstrap/Card';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import AddVideo from './AddVideo';
import axios from 'axios';



function Landing() {
  const [detail, setDetail] = useState([])
  const [tokenAccess, setTokenAccess] = useState('');

useEffect(()=>{
  const token = sessionStorage.getItem('token')
  if(token){
    setTokenAccess(token)
    fetchDetail(token)
  }
}, [])

const fetchDetail = async (token) =>{
  try{
    const response = await axios.get("http://127.0.0.1:8000/api/product/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    })
    setDetail(response.data);
    console.log("api fetched", response.data);


    console.log(response.data);
  }catch (error) {
    console.log('error in fetching', error);
  }
}

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <div>
        <Header showUserButton={true} />
      </div>
      <div className='mt-3 ms-4 me-5 d-flex justify-content-between'>
        <h1 className='head1'>Recommended For You</h1>
        <div>
          <input style={{ width: '250px', height: '30px', textAlign: 'center' }} className='mt-1' type='text' placeholder='Search videos by name' />
        </div>
        <AddVideo />
      </div>
      <div >
    
       <div className='mt-4 gap-2 d-flex justify-content-evenly'>
       {detail.map((item, index)=>(
        
       
       <Card onClick={handleShow} style={{ width: '18rem' }} key={index}>
          {/* <Card.Img variant="top" style={{ height: '200px' }} src={item.media} /> */}

          <Card.Img variant="top" src={item.media} style={{ height: '150px',width:'100%', objectFit: 'cover' }} />

          <Card.Body>
            <Card.Title className='d-flex justify-content-center' onClick={handleShow}>{item.title}</Card.Title>
            <Card.Text className='d-flex justify-content-center' onClick={handleShow}>
              {item.description}            </Card.Text>
          </Card.Body>
        </Card>
         ))}
       </div>

        <div>
        <Modal size='lg' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>More Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col>
                <img className='img-fluid' style={{ height: '250px', width: '300px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5c9icJbbofNgg9hHqBZ1NnLGFkWQXv-2wMLioEY0cYT1aqzfovUJjCDNAguXTAKqqgs&usqp=CAU" alt="" />
              </Col>
              <Col>
                <h2>Programming </h2>
                <p className='fw-bolder mt-4'>Description: <span style={{ fontWeight: 'lighter' }}  >discription</span></p>
                <p className='fw-bolder'>Price: <span style={{ fontWeight: 'lighter' }}>price$</span></p>
                <div style={{ marginLeft: '280px', marginTop: '-30px' }} className='d-flex justify-content-evenly'>
                  <Button  ><i class="fa-solid fa-cart-plus"></i></Button>
                </div>
              </Col>
            </Row>

          </Modal.Body>
        </Modal>
        </div>
      </div>

    </>
  )
}

export default Landing