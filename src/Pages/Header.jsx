import React from 'react'
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Cart from './Cart';

function Header({ showUserButton }) {
  return (
    <>
      <div >
        <Navbar style={{ width: '100%' }} expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand style={{ marginLeft: '-50px' }} className='navname' href=""> <i class="fa-solid fa-graduation-cap"></i> Skill-Share</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Stack spacing={2} direction="row">


                {
                  showUserButton ? (
                    <div className='d-flex'>
                      <Link to={'/profile'} className='profilebtn btn  shadow bg-primary' style={{ padding: '6px', width: '50px', height: '50px', marginLeft: '950px', color: 'white' }} variant="contained"><i class="fa-solid fa-user mt-2"></i></Link>
                      <div style={{ marginLeft: '-150px ' }}>
                        <Link to={'/cart'} className='cartbtn btn  shadow bg-primary' style={{ padding: '6px', width: '50px', height: '50px', color: 'white' }} variant="contained"><i style={{marginTop:'11px'}} class=" fa-solid fa-cart-shopping"></i></Link>
                      </div>
                    </div>
                  ) : (
                    <Link to={'/login'} className='btn rounded shadow bg-primary' style={{ padding: '6px', width: '100px', marginLeft: '900px', color: 'white' }} variant="contained">Login</Link>
                  )
                }


              </Stack>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default Header