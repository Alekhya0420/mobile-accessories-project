import React from 'react';
import details from '../../database/db.json';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { resetPassword } from '../../redux/slice/authSlice';

function Reset() {
    let mynav = useNavigate();
    let form = useForm();
    let { register, handleSubmit, formState } = form;
    let { errors } = formState;
    let dispatch = useDispatch();

    const submitHandle = (data) => {
        let user = details.registration.find((user) => user.email === data.email);

        if (!user) {
            alert("User with this email doesn't exist");
            return;
        }

        let updatedUser = {
            id: user.id,
            password: data.password,
            email: user.email,
        };

        dispatch(resetPassword(updatedUser))
            .then(() => {
                alert("Password reset successful");
                mynav('/login');
            })
            .catch((error) => console.log("Error is", error));
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="justify-content-center">
                <h2>Reset Password</h2>
                <Form
                    onSubmit={handleSubmit(submitHandle)}
                    className="p-4 rounded shadow-lg"
                    style={{ background: '#fff' }}
                >
                    <Form.Group controlId="formBasicEmail" className="mb-4 text-start">
                        <Form.Label style={{ fontWeight: 'bold', color: '#333' }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', { required: 'Email is required' })}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid red' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-4 text-start">
                    <Form.Label style={{ fontWeight: 'bold', color: '#333' }}>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your new password"
                    {...register('password', {required: 'Password is required',
                    pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, 
                    message: 'Password must be at least 8 characters long, include one special character, and one number',
                    },
                    })}
                    isInvalid={!!errors.password}
                    style={{ padding: '10px', borderRadius: '10px', border: '1px solid red' }}
                    />
                     <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
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
                        Reset Password
                    </Button>

                    <div className="text-center mt-3">
                        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                            Back to Login
                        </Link>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default Reset;

