import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';

const ExpoManagement = () => {
    const [expos, setExpos] = useState([]);
    const [expoData, setExpoData] = useState({ title: '', date: '', location: '', description: '', theme: '' });
    const [editExpoData, setEditExpoData] = useState(null); // For editing an expo
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Memoize fetchExpos
    const fetchExpos = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/expos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
                },
            });
            setExpos(response.data);
        } catch (err) {
            setErrorMessage('Failed to fetch expos. Please check your connection or credentials.');
            console.error('Error fetching expos', err);
        }
    }, []);

    useEffect(() => {
        fetchExpos();
    }, [fetchExpos]);

    // Handle Expo creation
    const handleCreateExpo = async (e) => {
        e.preventDefault();
        if (!expoData.title || !expoData.date || !expoData.location || !expoData.description || !expoData.theme) {
            setErrorMessage('All fields are required to create an expo.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/expos',
                expoData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchExpos();
            setExpoData({ title: '', date: '', location: '', description: '', theme: '' });
            setSuccessMessage('Expo created successfully.');
            setErrorMessage('');
        } catch (err) {
            setErrorMessage('Error creating expo. Please try again.');
            console.error('Error creating expo', err);
        }
    };

    // Handle editing an expo
    const handleEditExpo = (expoId) => {
        const expo = expos.find((expo) => expo._id === expoId);
        setEditExpoData({ ...expo }); // Clone to avoid mutating state
    };

    // Handle saving the edited expo
    const handleSaveEditExpo = async (e) => {
        e.preventDefault();
        if (!editExpoData.title || !editExpoData.date || !editExpoData.location || !editExpoData.description || !editExpoData.theme) {
            setErrorMessage('All fields are required to save changes.');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/expos/${editExpoData._id}/update`,
                editExpoData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchExpos();
            setEditExpoData(null);
            setSuccessMessage('Expo updated successfully.');
            setErrorMessage('');
        } catch (err) {
            setErrorMessage('Error saving edited expo. Please try again.');
            console.error('Error saving edited expo', err);
        }
    };

    // Handle deleting an expo
    const handleDeleteExpo = async (expoId) => {
        try {
            await axios.delete(`http://localhost:5000/api/expos/${expoId}/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchExpos();
            setSuccessMessage('Expo deleted successfully.');
            setErrorMessage('');
        } catch (err) {
            setErrorMessage('Error deleting expo. Please try again.');
            console.error('Error deleting expo', err);
        }
    };

    return (
        <Container>
            <h2 className="my-4 text-center">Expo Management</h2>

            {/* Success and Error Messages */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {/* Expo Create Form */}
            <Form onSubmit={handleCreateExpo}>
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={expoData.title}
                            onChange={(e) => setExpoData({ ...expoData, title: e.target.value })}
                            required
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Control
                            type="date"
                            value={expoData.date}
                            onChange={(e) => setExpoData({ ...expoData, date: e.target.value })}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Location"
                            value={expoData.location}
                            onChange={(e) => setExpoData({ ...expoData, location: e.target.value })}
                            required
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Theme"
                            value={expoData.theme}
                            onChange={(e) => setExpoData({ ...expoData, theme: e.target.value })}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            value={expoData.description}
                            onChange={(e) => setExpoData({ ...expoData, description: e.target.value })}
                            required
                        />
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">
                    Create Expo
                </Button>
            </Form>

            {/* Edit Expo Form */}
            {editExpoData && (
                <Form onSubmit={handleSaveEditExpo} className="mt-4">
                    <h3>Edit Expo</h3>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Control
                                type="text"
                                value={editExpoData.title}
                                onChange={(e) => setEditExpoData({ ...editExpoData, title: e.target.value })}
                                required
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Control
                                type="date"
                                value={editExpoData.date}
                                onChange={(e) => setEditExpoData({ ...editExpoData, date: e.target.value })}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Control
                                type="text"
                                value={editExpoData.location}
                                onChange={(e) => setEditExpoData({ ...editExpoData, location: e.target.value })}
                                required
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Control
                                type="text"
                                value={editExpoData.theme}
                                onChange={(e) => setEditExpoData({ ...editExpoData, theme: e.target.value })}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Control
                                as="textarea"
                                value={editExpoData.description}
                                onChange={(e) => setEditExpoData({ ...editExpoData, description: e.target.value })}
                                required
                            />
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100">
                        Save Edit
                    </Button>
                </Form>
            )}

            {/* Expo List */}
            <ListGroup className="mt-4">
                {expos.map((expo) => (
                    <ListGroup.Item key={expo._id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{expo.title}</h5>
                            <p>{expo.date}</p>
                            <p>{expo.location}</p>
                            <p>{expo.description}</p>
                        </div>
                        <div>
                            <Button variant="warning" className="me-2" onClick={() => handleEditExpo(expo._id)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteExpo(expo._id)}>
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default ExpoManagement;
