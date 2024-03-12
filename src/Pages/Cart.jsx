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


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const Url = 'http://127.0.0.1:8000'

  useEffect(() => {
    fetchCartItems();
  }, []);

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
      // console.log(cartItems);
      console.log("Cart items fetched:", response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
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
  
      // After successful deletion, fetch updated cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  // const [cartItems, setCartItems] = useState([]);

  // const addItemToCart = (item) => {
  //   console.log("Cart Items:", cartItems);

  //   setCartItems([...cartItems, item]); // Add item to cart
  // };
  

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
                      <a href="/landing" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      

                      <div>
                        <h1 className="mb-1">cart</h1>
                        <p className="mb-0">You have 0 items in your cart</p>
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
                              {item.quantity}
                              </MDBTypography>
                            </div>
                            <div style={{ width: "80px" }}>
                              <MDBTypography tag="h5" className="mb-0">
                              {item.total}
                              </MDBTypography>
                            </div>
                            <a href="#!" style={{ color: 'red' }}  onClick={() => handleDeleteItem(item.id)} >
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
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                          <MDBCardImage /* src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" */
                            fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
                        </div>

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
                          <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                            placeholder="Cardholder's Name" contrast />

                          <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                            minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                            </MDBCol>
                          </MDBRow>
                        </form>

                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$4818.00</p>
                        </div>

                        <MDBBtn color="info" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>$4818.00</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}