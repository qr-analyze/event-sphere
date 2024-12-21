import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { editSchedule, deleteSchedule, fetchSchedules } from '../api/schedual_axios';
import { Modal, Button, Alert } from 'react-bootstrap';  // Import Bootstrap Modal and Alert components
import NavbarComponent from "./Navbar";
const ScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editScheduleData, setEditScheduleData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch schedules when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSchedules();
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setErrorMessage('Error fetching schedules.');
            }
        };

        fetchData();
    }, []);

    // Handle editing a schedule
    const handleEditSchedule = async () => {
        try {
            const updatedSchedule = await editSchedule(editScheduleData);
            setSchedules(schedules.map((s) => (s._id === updatedSchedule._id ? updatedSchedule : s)));
            setSuccessMessage('Schedule updated successfully!');
            setShowModal(false); // Close modal after successful edit
        } catch (error) {
            console.error('Error editing schedule:', error);
            setErrorMessage('Error editing schedule.');
        }
    };

    // Handle deleting a schedule
    const handleDeleteSchedule = async (id) => {
        try {
            await deleteSchedule(id);
            setSchedules(schedules.filter((schedule) => schedule._id !== id));
            setSuccessMessage('Schedule deleted successfully!');
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setErrorMessage('Error deleting schedule.');
        }
    };

    // Handle opening the edit modal with existing schedule data
    const openEditModal = (schedule) => {
        setEditScheduleData({ ...schedule });
        setShowModal(true);
    };

    return (
        <><NavbarComponent /><div className="container mt-4">
            <h2 className="text-center mb-4">Schedule List</h2>

            {/* Display success or error message */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Speaker</th>
                            <th>Topic</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.length > 0 ? (
                            schedules.map((schedule) => (
                                <tr key={schedule._id}>
                                    <td>{schedule.title}</td>
                                    <td>{schedule.date}</td>
                                    <td>{schedule.timeSlot}</td>
                                    <td>{schedule.speaker}</td>
                                    <td>{schedule.topic}</td>
                                    <td>{schedule.location}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => openEditModal(schedule)} // Open the edit modal
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteSchedule(schedule._id)} // Delete schedule
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No schedules available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Schedule Modal */}
            {editScheduleData && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Schedule</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={editScheduleData.title}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, title: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    value={editScheduleData.date}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, date: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="timeSlot" className="form-label">Time Slot</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="timeSlot"
                                    value={editScheduleData.timeSlot}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, timeSlot: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="speaker" className="form-label">Speaker</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="speaker"
                                    value={editScheduleData.speaker}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, speaker: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="topic" className="form-label">Topic</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="topic"
                                    value={editScheduleData.topic}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, topic: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    value={editScheduleData.location}
                                    onChange={(e) => setEditScheduleData({ ...editScheduleData, location: e.target.value })} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditSchedule}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div></>
    );
};

export default ScheduleList;
