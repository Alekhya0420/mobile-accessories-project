import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Cardsdata from '../../CardData';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../redux/slice/cartSlice';

const Product = () => {
    const [cartData, setCartData] = useState(Cardsdata);
    const [search, searchState] = useState(""); 
    const dispatch = useDispatch();

    const send = (element) => {
        dispatch(addTocart(element));
    };

    const filteredData = cartData.filter((item) =>
        item.dish.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container className="my-5">
            <h2 className="text-center text-white mb-4 pt-4">Available Gadgets</h2>
            <input
                type="text"
                placeholder="Enter what you want to search"
                value={search}
                onChange={(e) => searchState(e.target.value)} 
                className="search-bar shadow-lg border-0 rounded-pill px-4"
                    style={{
                        width: '50%',
                        height: '50px',
                        fontSize: '16px',
                        color: '#f1f1f1',
                    }}
            />
            <Row className="g-4">
                {filteredData.map((element, index) => (
                    <Col key={index} xs={12} md={4}>
                        <Card
                            className="shadow-lg border-0 rounded flex-grow-1"
                            style={{ backgroundColor: '#1c1c1e', overflow: 'hidden' }}
                        >
                            <Card.Img
                                variant="top"
                                src={element.imgdata}
                                style={{
                                    height: '260px',
                                    objectFit: 'cover',
                                    borderRadius: '0.5rem 0.5rem 0 0',
                                    opacity: '0.9'
                                }}
                                className="card-img-top transition-transform"
                            />
                            <Card.Body
                                style={{
                                    background: 'linear-gradient(135deg, rgba(119, 112, 247, 0.7), rgba(0, 0, 0, 0.3))',
                                    color: '#f1f1f1'
                                }}
                                className="rounded-bottom"
                            >
                                <div className="d-flex justify-content-between mb-3">
                                    <Card.Title className="h5">{element.dish}</Card.Title>
                                    <span className="text-warning">{element.rating}&nbsp;★</span>
                                </div>
                                <Card.Text className="mb-2">{element.address}</Card.Text>
                                <Card.Text className="mb-2">{element.somedata}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Text className="fw-bold">₹ {element.price}</Card.Text>
                                    <Button
                                        variant="outline-light"
                                        onClick={() => send(element)}
                                        className="btn-primary"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Product;

