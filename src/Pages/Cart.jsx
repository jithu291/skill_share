import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import payment1 from '../assets/Video/payment1.mp4'
import { useNavigate } from "react-router-dom";
import UPI from "../components/UPI";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    upi: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [paymentOption, setpaymentOption] = useState('card')
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = () => {

    setVideoEnded(true);
  };

  useEffect(() => {
    if (videoEnded) {

      navigate("/landing");
    }
  }, [videoEnded, navigate]);


  const Url = 'http://127.0.0.1:8000'

  useEffect(() => {
    fetchCartItems();
  }, []);
  useEffect(() => {

    calculateTotalPrice();
  }, [cartItems]);
  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Please login.");
        return;
      }

      const response = await axios.get(" http://localhost:8000/api/cart/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": 'multipart/form-data',
        },
      });
      setCartItems(response.data);

      console.log("Cart items fetched:", response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const calculateTotalPrice = () => {
    if (cartItems && cartItems.cart_items) {
      let total = 0;
      cartItems.cart_items.forEach((item) => {
        total += item.total;
      });
      setTotalPrice(total);
    }
  };
  const handleDeleteItem = async (itemId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Please login.");
        return;
      }

      await axios.delete(`http://localhost:8000/api/cart/item/${itemId}/`, {
        headers: {
          Authorization: `Token ${token}`
        },
      });


      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };




  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.cart_items.map((item) => {
      if (item.id === itemId) {
        const newQty = item.qty + 1;
        const newTotal = item.product.price * newQty;
        return { ...item, qty: newQty, total: newTotal };
      }
      return item;
    });
    setCartItems({ ...cartItems, cart_items: updatedCartItems });
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.cart_items.map((item) => {
      if (item.id === itemId && item.qty > 1) {
        const newQty = item.qty - 1;
        const newTotal = item.product.price * newQty;
        return { ...item, qty: newQty, total: newTotal };
      }
      return item;
    });
    setCartItems({ ...cartItems, cart_items: updatedCartItems });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleCheckout = () => {
    if (paymentOption === 'card') {
      if (
        !cardDetails.cardholderName ||
        !cardDetails.cardNumber ||
        !cardDetails.expiration ||
        !cardDetails.cvv
      ) {
        toast.error("Please fill in all payment details");
        return;
      }
    } else if (paymentOption === 'upi') {
      const upiIdInput = document.getElementById('upiIdInput');
      if (!upiIdInput || !upiIdInput.value.trim()) {
        toast.error("Please enter your UPI ID");
        return;
      }
    }

    setShowModal(true);
  };
  const handlePaymentConfirmation = () => {
    setShowModal(true);
  };

  const handlePaymentOptionChange = (option) => {
    setpaymentOption(option)
  }
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }} >

      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href="/landing" className="text-body" style={{ textDecoration: 'none' }}>
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">


                      <div>
                        <h1 className="mb-1">cart</h1>
                        {/* <p className="mb-0">You have 0 items in your cart</p> */}
                      </div>

                    </div>
                    {Array.isArray(cartItems.cart_items) &&
                      cartItems.cart_items.map((item) => (
                        <MDBCard className="mb-3" key={item.id}>
                          <MDBCardBody>
                            <div>

                              <div className="d-flex justify-content-between">



                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <MDBCardImage
                                      src={`${Url}${item.product.media}`}
                                      fluid className="rounded-3" style={{ width: "65px" }}
                                      alt="Shopping item" />
                                  </div>
                                  <div className="ms-3">
                                    <MDBTypography tag="h5">
                                      {item.product.title}
                                    </MDBTypography>
                                    <p className="small mb-0">Description:{item.product.description}</p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}>
                                    <MDBTypography tag="h5" className="fw-normal mb-0">
                                      <div className="d-flex" style={{ marginLeft: '-100px' }}>
                                        <Button onClick={() => handleDecrement(item.id)} variant="outline-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><i class="fa-solid fa-minus"></i></Button>
                                        {item.qty}
                                        <Button onClick={() => handleIncrement(item.id)} variant="outline-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><i class="fa-solid fa-plus"></i></Button>
                                      </div>
                                    </MDBTypography>
                                  </div>
                                  <div style={{ width: "80px" }}>
                                    <MDBTypography tag="h5" className="mb-0">

                                      {item.total}
                                    </MDBTypography>
                                  </div>
                                  <a href="#!" style={{ color: 'red' }} onClick={() => handleDeleteItem(item.id)} >
                                    <MDBIcon fas icon="trash-alt" />
                                  </a>
                                </div>
                              </div>

                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      ))}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <MDBTypography tag="h5" className=" text-center">
                          Payment Option  </MDBTypography>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-2">

                          <MDBTypography tag="h5" className="mb-0  mt-0 align-items-center">
                            <button className="paymentbtn btn text-white " onClick={() => handlePaymentOptionChange('card')}>Credit/Debit Card</button>
                            <button className="paymentbtn btn text-white  " onClick={() => handlePaymentOptionChange('upi')}> UPI Payment</button>
                          </MDBTypography>

                        </div>
                        {paymentOption === 'card' && (
                          <>
                            <p className="small">Card type</p>
                            <a href="#!" type="submit" className="text-white">
                              <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <MDBIcon fab icon="cc-visa fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <MDBIcon fab icon="cc-amex fa-2x me-2" />
                            </a>
                            <a href="#!" type="submit" className="text-white">
                              <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                            </a>

                            <form className="mt-4">
                              <MDBInput className="mb-4" label="Cardholder's Name" placeholder="Cardholder's Name" type="text" size="lg"
                                contrast value={cardDetails.cardholderName}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })} />

                              <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                                minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast value={cardDetails.cardNumber}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />

                              <MDBRow className="mb-4">
                                <MDBCol md="6">
                                  <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                    minLength="6" maxLength="6" placeholder="MM/YY" contrast value={cardDetails.expiration}
                                    onChange={(e) => setCardDetails({ ...cardDetails, expiration: e.target.value })} />
                                </MDBCol>
                                <MDBCol md="6">
                                  <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                    maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                                </MDBCol>
                              </MDBRow>
                            </form>
                            <Button
                              onClick={() => setOpen(!open)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}
                            >
                              <Form.Check
                                type="checkbox"
                                label="User Details"
                                style={{ color: 'white' }}
                              />
                            </Button>
                            <Collapse in={open}>
                              <div id="example-collapse-text">
                                <Form.Group className="d-flex">
                                  <Form.Control
                                    id="upiIdInput"
                                    type="text"
                                    placeholder="Full Name"
                                    className="shadow"
                                  />
                                </Form.Group>
                                <Form.Group className="d-flex">
                                  <Form.Control
                                    id="UserInput"
                                    type="text"
                                    placeholder="Address"
                                    className="shadow mt-2"
                                  style={{height:'80px'}}
                                  />
                                </Form.Group>
                              </div>
                            </Collapse>
                          </>
                        )}

                        {paymentOption === 'upi' && (
                          <>
                            <UPI />
                          </>
                        )}


                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>

                        </div>

                        <Button variant="success" color="info" block size="lg" onClick={handleCheckout}>
                          <div className="d-flex justify-content-between">
                            <span>${totalPrice.toFixed(2)}</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </Button>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer theme='colored' autoClose='2000' />


      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <video autoPlay style={{ width: '100%' }} id="paymentSuccessVideo" onEnded={handleVideoEnd} >
            <source src={payment1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>

      </Modal>

    </section>
  );
}