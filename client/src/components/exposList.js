import React, { useEffect, useState } from 'react';

import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllExpos, deleteExpo, updateExpo } from '../api/expoaxios'; // Import the functions

const ExpoList = () => {
    const [expos, setExpos] = useState([]);
    const [editForm, setEditForm] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        // Fetch expos data using getAllExpos
        getAllExpos()
            .then(response => {
                setExpos(response); // Update the expos state with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the expos!", error);
            });
    }, []);

    const handleEdit = (expo) => {
        setEditForm({ ...expo });  // Create a copy of the expo object to avoid direct mutation
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        deleteExpo(id)
            .then(response => {
                alert(response.message); // Show a success message
                setExpos(expos.filter(expo => expo._id !== id)); // Remove the deleted expo from the list
            })
            .catch(error => {
                console.error("There was an error deleting the expo!", error);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Call the updateExpo function with expo data
        updateExpo(editForm._id, editForm)
            .then(response => {
                alert(response.message); // Show success message
                setExpos(expos.map(expo => expo._id === editForm._id ? editForm : expo)); // Update the expo in the list
                setShowEditModal(false); // Close the modal after successful update
            })
            .catch(error => {
                console.error("Error updating expo:", error);
                alert("Error updating expo.");
            });
    };

    return (
        <div className="container mt-5">
            <h1>Expo List</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Theme</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expos.map(expo => (
                        <tr key={expo._id}>
                            <td>{expo.title}</td>
                            <td>{expo.date}</td>
                            <td>{expo.location}</td>
                            <td>{expo.description}</td>
                            <td>{expo.theme}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(expo)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(expo._id)} className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Expo Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editForm?.title || ''}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={editForm?.date || ''}
                                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={editForm?.location || ''}
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={editForm?.description || ''}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="theme">
                            <Form.Label>Theme</Form.Label>
                            <Form.Control
                                type="text"
                                value={editForm?.theme || ''}
                                onChange={(e) => setEditForm({ ...editForm, theme: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-2">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ExpoList;
