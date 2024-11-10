import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Banner.css'; 
import parts from './accesories.jpg';
import headset from './headset.jpg';
import phone from './smartphone.jpg';
import { Link } from 'react-router-dom';
import  productsArray from '../../storage/Storage'

function Home() {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner-section">
        <Row>
          <Col>
            <h1 className="display-4 fw-bold" style={{ color: 'white' }}>Find Your Perfect Products</h1>
            <p className="lead" style={{color:'white',fontSize:"30px",fontWeight:"bolder"}}>Explore the latest models at unbeatable prices!</p>
            <Link to="/register" className='text-white'>
              <Button variant="primary" size="lg" className="mt-3 text-white">Shop Now</Button>
            </Link>
          </Col>
        </Row>
      </section>

      {/* Categories Section */}
      <section className="py-5 categories-section text-center" style={{ backgroundColor: "#001F33" }}>
        <Container>
          <h2 className="fw-bold text-info fs-1 fst-italic">Shop</h2>
          <Row className="mt-4">
            {['Smartphones', 'Accessories', 'Wearables'].map((category, index) => (
              <Col xs={12} sm={6} md={4} className="mb-4" key={index}>
                <Card className="category-card shadow-lg font-weight-bold fs-5" style={{ backgroundColor: '#003366', color: 'white' }}>
                  <Card.Img variant="top" src={index === 0 ? phone : index === 1 ? parts : headset} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className='text-info'>{category}</Card.Title>
                    <Card.Text>
                      {`Discover the latest ${category.toLowerCase()} from top brands.`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Phones Section */}
      <section className="py-5 text-center" style={{ backgroundColor: '#6082B6' }}>
        <Container>
          <h2 className="fw-bold text-info fs-1 fst-italic">Featured Products</h2>
          <Row className="mt-4">
            {productsArray.map((product, index) => (
              <Col xs={12} sm={6} md={4} className="mb-4" key={index}>
                <Card className="featured-card shadow-lg font-weight-bold fs-5" style={{ backgroundColor: '#003366', color: '#ffffff', height: '400px' }}>
                  <Card.Img variant="top" src={product.image} style={{ height: '200px', width: '100%' }} />
                  <Card.Body>
                    <Card.Title className="text-uppercase text-info">{product.name}</Card.Title>
                    <Card.Text>{product.importance}</Card.Text>
                    <Link to="/register">
                      <Button className='btn-primary w-50'>Visit</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-5" style={{ backgroundColor: '#001F33' }}> 
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold text-info fs-1 fst-italic">Our Vision and Mission</h2>
            </Col>
          </Row>

          <Row className="text-center">
            {['Innovative Solutions', 'Customer First Approach', 'Sustainability Commitment', 'Global Reach'].map((item, index) => (
              <Col xs={12} md={6} className="mb-4 text-white fs-5" key={index}>
                <h3 className="fw-bold text-info">{item}</h3>
                <p className="mt-3" style={{ color: '#A0D1E9' }}>
                  {index === 0 ? "Our team is dedicated to bringing you the latest advancements in technology, ensuring that our products not only meet but exceed industry standards." :
                   index === 1 ? "We prioritize your needs, offering tailored solutions and exceptional support to provide a shopping experience like no other." :
                   index === 2 ? "Our commitment to sustainability ensures that we deliver products that are not only high-performing but also environmentally responsible." :
                   "With customers around the world, we are expanding our reach and continuing to deliver excellence on a global scale."}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 text-center call-to-action-section" style={{ backgroundColor: "#6082B6" }}>
        <Container>
          <h2 className="fw-bold text-info fs-1 fst-italic">Join Our Community</h2>
          <p className="text-white fw-bolder fs-2">Subscribe to our newsletter for exclusive offers and updates!</p>
          <Button variant="primary" size="lg">Subscribe Now</Button>
        </Container>
      </section>
    </div>
  );
}

export default Home;
