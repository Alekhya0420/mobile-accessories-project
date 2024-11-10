import React from 'react'
import Header from '../layout/Header'
import CartDetails from '../component/cartDetails/CartDetails'
import Product from '../component/product/Product'
import Registration from '../component/registration/Registration'
import Login from '../component/login/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../component/home/Home'
import Contact from '../component/contact/Contact'
import Footer from '../layout/Footer'



function Routing() {
  return (
    <div>
        <Router>
        <Header></Header>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="products" element={<Product/>}/>
                <Route path="cart" element={<CartDetails/>}/>
                <Route path="register" element={<Registration/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="contact" element={<Contact/>}/>
              </Routes>
          <Footer></Footer>
        </Router>
        
    </div>
  )
}

export default Routing