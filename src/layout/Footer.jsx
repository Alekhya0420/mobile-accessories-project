// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// function Footer() {
//   return (
//     <footer className="bg-light py-4">
//       <Container>
//         <Row className="text-center text-md-start d-flex justify-content-center align-items-center">
//           <Col md={3} className="mb-3">
//             <h5 className="text-uppercase fw-bold">About Us</h5>
//             <p className="small text-muted" style={{ fontWeight: '500' }}>
//               We are a team dedicated to providing quality products and services. Your satisfaction is our top priority.
//             </p>
//           </Col>

//           <Col md={3} className="mb-3">
//             <h5 className="text-uppercase fw-bold">Quick Links</h5>
//             <p className="small text-muted" style={{ fontWeight: '500' }}>
//               Home<br />
//               About<br />
//               Contact
//             </p>
//           </Col>

//           <Col md={3} className="mb-3">
//             <h5 className="text-uppercase fw-bold">Contact Us</h5>
//             <p className="small text-muted" style={{ fontWeight: '500' }}>
//               123 Main Street, City, Country
//               <br />
//               Phone: +1 234 567 890
//               <br />
//               Email: info@example.com
//             </p>
//           </Col>

//           <Col md={3} className="mb-3">
//             <h5 className="text-uppercase fw-bold">Follow Us</h5>
//             <p className="small text-muted" style={{ fontWeight: '500' }}>
//               Facebook | Twitter | Instagram | LinkedIn
//             </p>
//           </Col>
//         </Row>

      
//         <Row>
//           <Col className="text-center small text-muted mt-3">
//             © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;

import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-4">
      <Container>
        <Row className="text-center text-md-start d-flex justify-content-center align-items-center">
          <Col md={3} className="mb-3">
            <h5 className="text-uppercase fw-bold">About Us</h5>
            <p className="small text-muted" style={{ fontWeight: '500' }}>
              We are a team dedicated to providing quality products and services. Your satisfaction is our top priority.
            </p>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <p className="small text-muted" style={{ fontWeight: '500' }}>
              Home<br />
              About<br />
              Contact
            </p>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className="text-uppercase fw-bold">Contact Us</h5>
            <p className="small text-muted" style={{ fontWeight: '500' }}>
              123 Main Street, City, Country
              <br />
              Phone: +1 234 567 890
              <br />
              Email: info@example.com
            </p>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className="text-uppercase fw-bold">Follow Us</h5>
            <p className="small text-muted" style={{ fontWeight: '500' }}>
              Facebook | Twitter | Instagram | LinkedIn
            </p>
          </Col>
        </Row>

        <Row>
          <Col className="text-center small text-muted mt-3">
            © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
