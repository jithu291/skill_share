import React, { useEffect, useState } from 'react'
import Header from './Header'
import Card from 'react-bootstrap/Card';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import AddVideo from './AddVideo';
import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';



function Landing() {
  const [detail, setDetail] = useState([])
  const [tokenAccess, setTokenAccess] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setTokenAccess(token)
      fetchDetail(token)
    }
  }, [])

  const fetchDetail = async (token) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/product/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": 'multipart/form-data'
        }
      })
      setDetail(response.data);
      console.log("api fetched", response.data);
    } catch (error) {
      console.log('error in fetching', error);
    }
  }

  const handleClose = () => setSelectedItem(null); // Close modal by resetting selectedItem to null

  const handleCardClick = (item) => {
    setSelectedItem(item, { id: item.id }); // Set the clicked item as selectedItem
  };




  const token = sessionStorage.getItem("token");

  const addToCart = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Handle case when token is not available
        console.log('Token not found. Please login.');
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/product/${id}/add_to_cart/`,
        null,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Item added to cart:', response.data);
      // You can update state or perform any other action upon successful addition to cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  const handleDeleteItem = async (itemId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Please login.");
        return;
      }

      await axios.delete(`http://localhost:8000/api/product/${itemId}/`, {
        headers: {
          Authorization: `Token ${token}`
        },
      });

      // After successful deletion, fetch updated cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  //for search option


  const handleSearch = (event) => {
    const value = event.target.value || '';
  setSearchTerm(value);
  };

  const filteredProducts = detail.filter(detail =>
    detail.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <>

      <div>
        <Header showUserButton={true} />
      </div>
      <div className='mt-3 ms-4 me-5 d-flex justify-content-between'>
        <h1 className='head1'>Recommended For You</h1>
        <div className='d-flex align-items-center text-center justify-content-center'>

          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            value={searchTerm}
            onChange={handleSearch}
          />
         
        </div>
      
        <AddVideo />
      </div>
      <div className='container mt-5 mb-5'  >
        <div className="row row-cols-1 row-cols-md-4 g-4  d-flex justify-content-between ">
          {filteredProducts.map((item, index) => (
            <Card style={{ width: '15rem' }} key={index} >
              <Card.Img className='mt-2' variant="top" style={{ height: '200px' }} src={item.media} onClick={() => handleCardClick(item)} />
              <Card.Body>
                <Card.Title className='d-flex justify-content-center' >{item.title}</Card.Title>
                <Card.Text className='d-flex justify-content-center' >
                  {item.description}            </Card.Text>
                <a href="#!" style={{ color: 'red' }} onClick={() => handleDeleteItem(item.id)}>
                  <MDBIcon fas icon="trash-alt" />
                </a>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div>
          <Modal size='lg' show={selectedItem !== null} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col>
                  <img className='img-fluid' style={{ height: '250px', width: '300px' }} src={selectedItem ? selectedItem.media : ""} alt="" />
                </Col>
                <Col>
                  <h2>{selectedItem ? selectedItem.title : ""}
                    {/* {selectedItem ? selectedItem.id : ""} */}
                  </h2>
                  <p className='fw-bolder mt-4'>Description: <span style={{ fontWeight: 'lighter' }}  >{selectedItem ? selectedItem.description : ""}</span></p>
                  <p className='fw-bolder'>Price: <span style={{ fontWeight: 'lighter' }}>{selectedItem ? selectedItem.price : ""}</span></p>
                  <div style={{ marginLeft: '280px', marginTop: '-30px' }} className='d-flex justify-content-evenly'>
                    <Button onClick={() => { addToCart(selectedItem.id); handleClose(); }} ><i class="fa-solid fa-cart-plus"></i></Button>
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