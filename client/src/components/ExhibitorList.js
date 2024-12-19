import React, { useEffect, useState } from 'react';
import { getAllExhibitors, approveExhibitor, deleteExhibitor, updateExhibitor } from '../api/exhibitorApi';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';

const ExhibitorList = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentExhibitor, setCurrentExhibitor] = useState(null);
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        boothPreferences: '',
        description: ''
    });

    useEffect(() => {
        const fetchExhibitors = async () => {
            try {
                const data = await getAllExhibitors();
                setExhibitors(data);
            } catch (err) {
                setError('Failed to fetch exhibitors');
                console.error('Error fetching exhibitors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchExhibitors();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveExhibitor(id);
            alert('Exhibitor approved!');
            setExhibitors((prevExhibitors) =>
                prevExhibitors.map((exhibitor) =>
                    exhibitor._id === id ? { ...exhibitor, isApproved: true } : exhibitor
                )
            );
        } catch (err) {
            console.error('Failed to approve exhibitor', err);
            alert('Failed to approve exhibitor');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteExhibitor(id);
            if (response.message === 'Exhibitor deleted successfully') {
                // Remove the exhibitor from the list in the state
                setExhibitors((prevExhibitors) => prevExhibitors.filter((exhibitor) => exhibitor._id !== id));
                alert('Exhibitor deleted!');
            } else {
                alert('Failed to delete exhibitor');
            }
        } catch (err) {
            console.error('Failed to delete exhibitor', err);
            alert('Failed to delete exhibitor');
        }
    };

    const handleEdit = (exhibitor) => {
        setCurrentExhibitor(exhibitor);
        setFormData({
            companyName: exhibitor.companyName,
            email: exhibitor.email,
            boothPreferences: exhibitor.boothPreferences,
            description: exhibitor.description
        });
        setShowEditModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitEdit = async () => {
        try {
            await updateExhibitor(currentExhibitor._id, formData);
            alert('Exhibitor updated!');
            setExhibitors((prevExhibitors) =>
                prevExhibitors.map((exhibitor) =>
                    exhibitor._id === currentExhibitor._id ? { ...exhibitor, ...formData } : exhibitor
                )
            );
            setShowEditModal(false);
        } catch (err) {
            console.error('Failed to update exhibitor', err);
            alert('Failed to update exhibitor');
        }
    };

    if (loading) {
        return <p>Loading exhibitors...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Exhibitors List</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Booth Preferences</th>
                        <th>Description</th>
                        <th>Approved</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exhibitors.map((exhibitor) => (
                        <tr key={exhibitor._id}>
                            <td>{exhibitor.companyName}</td>
                            <td>{exhibitor.email}</td>
                            <td>{exhibitor.boothPreferences}</td>
                            <td>{exhibitor.description}</td>
                            <td>
                                {exhibitor.isApproved ? (
                                    <Badge bg="success">Approved</Badge>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleApprove(exhibitor._id)}
                                    >
                                        Approve
                                    </Button>
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(exhibitor)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(exhibitor._id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Exhibitor Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Exhibitor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBoothPreferences">
                            <Form.Label>Booth Preferences</Form.Label>
                            <Form.Control
                                type="text"
                                name="boothPreferences"
                                value={formData.boothPreferences}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ExhibitorList;
