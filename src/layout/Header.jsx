import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Fetch from '../component/fetchDetails/Fetch';

function Header() {
  const { carts } = useSelector((state) => state.allCart);
  const navigate = useNavigate();

  

  const quantities = carts.map((item) => item.qnty);
  const totalQuantity = quantities.reduce((total, qnty) => total + qnty, 0);

  
  const logOut = () => {
    sessionStorage.clear();
    navigate('login');
  };

  
  const authToken = sessionStorage.getItem("authToken");

  return (
    <Navbar expand="lg" className="navbar bg-light sm-shadow" fixed="top">
      <Container>
        <Navbar.Brand>My-Showroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">

            <Nav.Link as={Link} to="">Home</Nav.Link>

          
            
            {!authToken && (
              <>
                <Nav.Link as={Link} to="register">Registration</Nav.Link>
                <Nav.Link as={Link} to="login">Login</Nav.Link>
              </>
            )}
            
            <Nav.Link as={Link} to="products">Product</Nav.Link>
            
            {authToken && (
            <Nav.Link as={Link} to="cart">
              🛒 <span className="badge bg-light text-dark">{totalQuantity}</span>
            </Nav.Link>
            )}

           
            {authToken && (
              <h1 className="btn text-danger" onClick={logOut}>Logout</h1>
            )}

<Nav.Link as={Link} to="contact">contact</Nav.Link>
          </Nav>

          {authToken && ( 
          <Nav.Link as={Link} to="fetch"><Fetch/></Nav.Link>
          )}

       
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
