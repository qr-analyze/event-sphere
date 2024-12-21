import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import NavbarComponent from './Navbar';

const UserForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'attendee',
    });

    const [alert, setAlert] = useState({
        message: '',
        type: '', // 'success' or 'danger'
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new user
        axios.post('http://localhost:5000/api/users/create', user)
            .then(() => {
                setAlert({
                    message: 'User created successfully!',
                    type: 'success',
                });
                setUser({ name: '', email: '', password: '', role: 'attendee' });
            })
            .catch((error) => {
                console.error('Error creating user Or User Exists already with this Email:', error);
                setAlert({
                    message: 'Error creating user Or User Exists already with this Email: Please try again.',
                    type: 'danger',
                });
            });
    };

    return (
        <div>
            <NavbarComponent />
            <div className='container'>
                {/* Display alert message */}
                {alert.message && (
                    <Alert variant={alert.type}>
                        {alert.message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option>attendee</option>
                            <option>organizer</option>
                            <option>exhibitor</option>
                            <option>admin</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add User
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UserForm;
