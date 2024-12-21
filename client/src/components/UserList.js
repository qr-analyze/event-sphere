import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { fetchUsers, deleteUser, updateUser } from '../api/user_axios'; // Import the API functions
import NavbarComponent from './Navbar';
const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedRole, setUpdatedRole] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // Fetch users on component mount
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchUsers();
                setUsers(userList);
            } catch (error) {
                setAlertMessage('Failed to load users');
                setAlertType('danger');
            }
        };

        loadUsers();
    }, []); // Empty dependency array ensures it runs once on mount

    // Handle user deletion
    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter((user) => user._id !== userId)); // Update the state after deletion
            setAlertMessage('User deleted successfully');
            setAlertType('success');
        } catch (error) {
            setAlertMessage('Error deleting user');
            setAlertType('danger');
        }
    };

    // Handle opening the edit modal
    const handleEdit = (user) => {
        setSelectedUser(user);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
        setUpdatedRole(user.role);
        setShowEditModal(true);
    };

    // Handle saving the edited user data
    const handleSaveEdit = async () => {
        try {
            const updatedUser = { name: updatedName, email: updatedEmail, role: updatedRole };
            await updateUser(selectedUser._id, updatedUser);
            setUsers(users.map((user) =>
                user._id === selectedUser._id ? { ...user, ...updatedUser } : user
            ));
            setAlertMessage('User updated successfully');
            setAlertType('success');
            setShowEditModal(false); // Close the modal
        } catch (error) {
            setAlertMessage('Error updating user');
            setAlertType('danger');
        }
    };

    return (
        <div>
            <NavbarComponent />
            {alertMessage && (
                <Alert variant={alertType} onClose={() => setAlertMessage('')} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={updatedRole}
                                onChange={(e) => setUpdatedRole(e.target.value)}
                            >
                                <option value="organizer">Organizer</option>
                                <option value="admin">Admin</option>
                                <option value="exhibitor">Exhibitor</option>
                                <option value="attendee">Attendee</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserTable;
