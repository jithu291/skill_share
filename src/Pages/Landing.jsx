import React, { useState } from 'react'
import Header from './Header'
import Card from 'react-bootstrap/Card';
import { Col, Modal, Row } from 'react-bootstrap';
import AddVideo from './AddVideo';



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
        <input style={{ width: '200px', height: '30px' }} className='mt-1' type='text' placeholder='Search videos by name' />
        <AddVideo />
      </div>
      <div className='mt-4 d-flex justify-content-evenly'>
        <Card onClick={handleShow} style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ height: '200px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5c9icJbbofNgg9hHqBZ1NnLGFkWQXv-2wMLioEY0cYT1aqzfovUJjCDNAguXTAKqqgs&usqp=CAU" />
          <Card.Body>
            <Card.Title className='d-flex justify-content-center'>Programming and Web Development</Card.Title>
            <Card.Text className='d-flex justify-content-center'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ height: '200px' }} src="https://www.insight-art.co.uk/images/home-panel/childrens-studio-800.jpg" />
          <Card.Body>
            <Card.Title className='d-flex justify-content-center'>Art and Craft</Card.Title>
            <Card.Text className='d-flex justify-content-center'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ height: '200px' }} src="https://img.freepik.com/free-photo/successful-business-people-with-speech-bubbles_53876-30780.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709337600&semt=sph" />
          <Card.Body>
            <Card.Title className='d-flex justify-content-center'>Language Learning</Card.Title>
            <Card.Text className='d-flex justify-content-center'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ height: '200px' }} src="https://www.edgehill.ac.uk/wp-content/uploads/2023/06/animation3-11-1024x576.jpg" />
          <Card.Body>
            <Card.Title className='d-flex justify-content-center'>Graphic Design</Card.Title>
            <Card.Text className='d-flex justify-content-center'>
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
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>

    </>
  )
}

export default Landing