import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, decrement, removeSingle, setCartData } from '../../redux/slice/cartSlice';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

const CartDetails = () => {
    const [quantity, setQuantity] = useState(0);
    const {carts,cartPrice} = useSelector((state) => state.allCart);
    const dispatch = useDispatch();
    const authToken = sessionStorage.getItem("authToken");

    
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

    // Handle adding item to cart
    const handleAddToCart = (data) => {
        dispatch(addTocart(data)); 
    };

    // Handle decrementing item quantity in the cart
    const handleDecrement = (data) => {
        dispatch(decrement(data)); // Update Redux state
    };

    // Handle removing item from the cart
    const handleRemoveItem = (data) => {
        dispatch(removeSingle(data)); // Update Redux state
    };

    // Calculate total quantity of items in the cart
    const calculateTotalQuantity = () => {
        const totalQuantity = carts.reduce((total, item) => total + item.qnty, 0);
        setQuantity(totalQuantity);
    };

    useEffect(() => {
        calculateTotalQuantity();
    }, [carts]);

    return (
        <Container className="my-5">
            <h2 className="text-center text-primary m-5 p-5">Your Cart</h2>

            {quantity > 0 && (
                <div className="mb-4 shadow-sm p-3 bg-light rounded">
                    <p className='text-primary fs-3'>Total Quantity: {quantity}</p>
                    <h5 className='text-primary fs-3'>Total Price: ${cartPrice.toFixed(2)}</h5>
                </div>
            )}

            {carts.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Dish</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((data) => (
                            <tr key={data.id}>
                                <td>
                                    <img
                                        src={data.imgdata}
                                        alt={data.dish}
                                        style={{ height: '80px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{data.dish}</td>
                                <td>${data.price.toFixed(2)}</td>
                                <td>{data.qnty}</td>
                                <td>${(data.price * data.qnty).toFixed(2)}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Button variant="primary" onClick={() => handleAddToCart(data)}>+</Button>
                                        <Button variant="secondary" onClick={() => handleDecrement(data)}>-</Button>
                                        <Button variant="warning" onClick={() => handleRemoveItem(data)}>Remove</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center my-5 p-4 border rounded shadow bg-light" style={{ maxWidth: '400px', margin: 'auto', height: "240px" }}>
                    <h3 className="text-danger mb-3">Your Cart is Empty</h3>
                    <p className="text-muted">No items in your cart.</p>
                    <p className="text-muted">Start adding some!</p>
                    <Link to="/products">
                        <Button className="btn btn-primary mt-3">Browse Gadgets</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default CartDetails;
