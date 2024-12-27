import React,{useState,useEffect} from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Fetch from '../component/fetchDetails/Fetch';
import {setCartData} from '../redux/slice/cartSlice';
import {useDispatch} from 'react-redux';


function Header() {
  
  
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const {carts,cartPrice} = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  const authToken = sessionStorage.getItem("authToken");
    
  
  const logOut = () => {
    sessionStorage.clear();
    navigate('login');
  };

  useEffect(() => {
    const fetchCartData = async () => {
        if (!authToken) return;

        try {
            const response = await axios.get(`http://localhost:5000/registration/${authToken}`);
            const userData = response.data;
            dispatch(setCartData({
                carts: userData.carts || [],
                cartPrice: userData.cartPrice || 0,
            }));
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    fetchCartData();
}, [authToken, dispatch]);
  
const calculateTotalQuantity = () => {
  const totalQuantity = carts.reduce((total, item) => total + item.qnty, 0);
  setQuantity(totalQuantity);
};

useEffect(() => {
  calculateTotalQuantity();
}, [carts]);
  


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
              Cart({quantity})<span className="badge bg-light text-dark"></span>
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

