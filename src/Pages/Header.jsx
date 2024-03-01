import React from 'react'
import {  Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <div >
    <Navbar style={{width:'100%'}} expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand style={{marginLeft:'-50px'}}  className='navname' href="#home"> <i class="fa-solid fa-graduation-cap"></i> Skill-Share</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Stack spacing={2} direction="row">
      
      <Link to={'/login'} className='btn rounded shadow bg-primary'  style={{padding:'6px', width:'100px', marginLeft:'900px',  color:'white'}} variant="contained">Login</Link>
     
    </Stack>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
    </>
  )
}

export default Header