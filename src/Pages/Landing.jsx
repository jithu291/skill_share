import React, { useState } from 'react'
import Header from './Header'
import Card from 'react-bootstrap/Card';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import AddVideo from './AddVideo';
import Cart from './Cart';



function Landing() {

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
        <input style={{ width: '250px', height: '30px', textAlign:'center' }} className='mt-1' type='text' placeholder='Search videos by name'  />
        </div>
        <AddVideo />
      </div>
      <div className='mt-4 d-flex justify-content-evenly'>
        <Card /* */ style={{ width: '18rem' }}>
          <Card.Img onClick={handleShow} variant="top" style={{ height: '200px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5c9icJbbofNgg9hHqBZ1NnLGFkWQXv-2wMLioEY0cYT1aqzfovUJjCDNAguXTAKqqgs&usqp=CAU" />
          <Card.Body>
            <Card.Title className='d-flex justify-content-center'  onClick={handleShow}>Programming and Web Development</Card.Title>
            <Card.Text className='d-flex justify-content-center'  onClick={handleShow}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        
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
                <h2>Programming and Web Development</h2>
                <p className='fw-bolder mt-4'>Description: <span style={{fontWeight:'lighter'}}  > Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut necessitatibus alias suscipit, consequuntur unde tempore dolorem. Voluptatem molestiae fugiat totam suscipit, delectus ipsam alias inventore eaque atque, soluta eveniet pariatur?</span></p>
                <p className='fw-bolder'>Price: <span style={{fontWeight:'lighter'}}>100$</span></p>
                <div style={{marginLeft:'280px', marginTop:'-30px'}} className='d-flex justify-content-evenly'>
         <Button><i class="fa-solid fa-cart-plus"></i></Button>
           </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>

    </>
  )
}

export default Landing