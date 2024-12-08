import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, decrement, removeSingle,setCartData } from '../../redux/slice/cartSlice';
import { updateCartInDB } from '../../redux/slice/cartSlice'; 
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartDetails = () => {
    const [quantity, setQuantity] = useState("");
    const { carts, cartPrice } = useSelector((state) => state.allCart);
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
                    cartPrice: userData.cartPrice || 0
                }));
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [authToken, dispatch]);

    const handleAddToCart = (data) => {
        dispatch(addTocart(data));
        updateCartInDB({carts,cartPrice}); 
    };

    const handleDecrement = (data) => {
        const existingItem = carts.find(item => item.id === data.id);

        if (existingItem && existingItem.qnty > 1)
        {
            dispatch(decrement(data));
            updateCartInDB({carts,cartPrice}); 
        } 
        else
        {
            handleRemoveItem(data);
        }
    };


    const handleRemoveItem = (data) => {
        dispatch(removeSingle(data));
      
        updateCartInDB({
            carts: carts.filter((item) => item.id !== data.id), 
            cartPrice: carts
                .filter((item) => item.id !== data.id)
               .reduce((total, item) => total + item.totalPrice,0), 
        }
    );
    };
 
    // let handleRemoveItem = (data)=>{
    //     dispatch(removeSingle(data));
    //     updateCartInDB({carts,cartPrice})
    // }


    console.log("cartprice is",cartPrice);
    

   

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
                <div className="text-center my-5 p-4 border rounded shadow bg-light" style={{ maxWidth: '400px', margin: 'auto',height:"240px" }}>
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



