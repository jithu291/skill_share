import React, { useEffect, useState } from 'react'
import Header from './Header'
import Card from 'react-bootstrap/Card';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import AddVideo from './AddVideo';
import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import Exam from './Exam';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Comments from '../components/Comments';


function Landing() {
  const [detail, setDetail] = useState([])
  const [tokenAccess, setTokenAccess] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');




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
  useEffect(()=>{
fetchDetail()
  },[])

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
      toast.success('Item added to cart successfully');
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
      fetchDetail();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  //for search option


  const handleSearch = (event) => {
    const value = event.target.value || '';
    setSearchTerm(value);
  };

  const placeBid = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('Token not found. Please login.');
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/api/product/bids/${id}/`,
        { amount: '1000' },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Bid placed successfully:', response.data);
      handleClose();
      toast.success('Item added to bid successfully');
      // You can update state or perform any other action upon successful bid placement
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };


  const filteredProducts = detail.filter(detail =>
    detail.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className='landing ' style={{ height: 'auto' }}>
        <div>
          <Header showUserButton={true} />
        </div>
        <div className=' mt-3 ms-4 me-5 d-flex justify-content-between'>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter  By Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={() => handleCategoryChange('All')}>All</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() => handleCategoryChange('coding')}>Coding </Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() => handleCategoryChange('drawing')}>Drawing</Dropdown.Item>
              <Dropdown.Item href="#/action-4" onClick={() => handleCategoryChange('crafting')}> Crafting</Dropdown.Item>
              <Dropdown.Item href="#/action-5" onClick={() => handleCategoryChange('communication')}> Communication</Dropdown.Item>
              <Dropdown.Item href="#/action-6" onClick={() => handleCategoryChange('others')}> Skill Hub</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          <div className='d-flex align-items-center text-center justify-content-center'>

            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchTerm}
              onChange={handleSearch}
            />

          </div>
          <Link to="/exam" className='exam btn btn-success'>
            <i class="fa-solid fa-circle-info mt-1 me-1" style={{ fontSize: '15px' }}></i>Exam
          </Link>
          <AddVideo AddVideo={fetchDetail()}/>
        </div>
        <div className='container mt-5 mb-5'  >
          <div className="row row-cols-1 row-cols-md-4 g-4  d-flex justify-content-between ">
            {filteredProducts.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map((item, index) => (
              <Card style={{ width: '15rem' }} key={index} className='shadow' >
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
        </div>
        <div>
          <Modal size='lg' show={selectedItem !== null} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row>
                <Col className='d-flex flex-column'>
                  <img className='img-fluid' style={{ height: '250px', width: '300px' }} src={selectedItem ? selectedItem.media : ""} alt="" />


                </Col>
                <Col>
                  <h2>{selectedItem ? selectedItem.title : ""}
                    {/* {selectedItem ? selectedItem.id : ""} */}
                  </h2>
                  <p className='fw-bolder mt-4'>Description: <span style={{ fontWeight: 'lighter' }}  >{selectedItem ? selectedItem.description : ""}</span></p>
                  <p className='fw-bolder'>Price: <span style={{ fontWeight: 'lighter' }}>{selectedItem ? selectedItem.price : ""}</span></p>
                  <p className='fw-bolder'>Category: <span style={{ fontWeight: 'lighter' }}>{selectedItem ? selectedItem.category : ""}</span></p>
                  <a href={selectedItem ? selectedItem.link : "#"}>{selectedItem ? selectedItem.link : "No link available"}</a>


                  <div style={{ marginLeft: '280px', marginTop: '-30px' }} className='d-flex justify-content-evenly gap-4 mt-5'>
                    <Button style={{ height: '35px' }} onClick={() => { addToCart(selectedItem.id); handleClose(); }} ><i class="fa-solid fa-cart-plus"></i></Button>

                    <Button style={{ height: '35px', width: '' }} onClick={() => { placeBid(selectedItem.id); handleClose(); }} className='btn btn-primary'><i class="fa-solid fa-coins ms-"></i></Button>


                  </div>
                  <Comments  Id={selectedItem ? selectedItem.id : null}/>
                </Col>
              </Row>

            </Modal.Body>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Landing