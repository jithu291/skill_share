import React from 'react'
import { Button, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
  return (
    <div>
    <div className='border border-dark'>
    <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand  className='navname' href="#home"> <i class="fa-solid fa-graduation-cap"></i> Skill-Share</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Button variant="contained">Login</Button>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
</div>
  )
}

export default Header