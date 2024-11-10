import React from 'react';
import { Container, Table, Card } from 'react-bootstrap';

const Contact = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center mb-5 mt-4">Contact Us</h2>

            <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                    <Table bordered hover className="text-center mb-0">
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Customer Service</td>
                                <td>Our support team is available 24/7 to assist you with any inquiries about our mobile accessories.</td>
                            </tr>
                            <tr>
                                <td>Email Us</td>
                                <td>support@mobileaccessories.com</td>
                            </tr>
                            <tr>
                                <td>Call Us</td>
                                <td>+123 456 7890</td>
                            </tr>
                            <tr>
                                <td>Office Location</td>
                                <td>123 Mobile St, Accessory City</td>
                            </tr>
                            <tr>
                                <td>Business Hours</td>
                                <td>
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
                                </td>
                            </tr>
                            <tr>
                                <td>Follow Us</td>
                                <td>Stay connected with us on social media for the latest updates and promotions.</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Contact;
