import React from 'react';
import details from '../../database/db.json'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { LoginInfo } from '../../redux/slice/authSlice'


function Login() {
    let mynav = useNavigate();
    let form = useForm();
    let { register, handleSubmit, formState } = form;
    let { errors } = formState;
    let dispatch = useDispatch();

    localStorage.clear();

    let submitHandle = (data) => {
        let userData = details.registration.find(
            (user) => user.email === data.email && user.password === data.password
        );

        if (!userData) {
            alert("Wrong credentials");
            return;
        }

        dispatch(LoginInfo(userData))
            .then((res) => {
                alert("Login successful");
                window.sessionStorage.setItem("authToken", res.meta.arg.id);
                mynav('/products')
               
            })
            .catch((error) => console.log("Error is", error));
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
            <Row className="justify-content-center">
             
                <h2>Login</h2>
                    <Form 
                        onSubmit={handleSubmit(submitHandle)} 
                        className="p-4 rounded shadow-lg"
                        style={{ background: '#fff' }}
                    >
                        
                        <Form.Group controlId="formBasicEmail" className="mb-4 text-start">
                            <Form.Label style={{ fontWeight: 'bold', color: '#333' }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email", { required: "Email is required" })}
                                style={{ padding: '10px', borderRadius: '10px',border:'1px solid red' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-4 text-start">
                            <Form.Label style={{fontWeight: 'bold', color: '#333'}}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                {...register("password", { required: "Password is required" })}
                                style={{ padding: '10px', borderRadius: '10px',border:'1px solid red'}}
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 py-2"
                            style={{
                                background: 'linear-gradient(90deg, #007bff, #00d4ff)',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                transition: 'background 0.3s ease',
                            }}
                        >
                            Login
                        </Button>

                       
                    </Form>
              
            </Row>
        </Container>
    );
}

export default Login;
