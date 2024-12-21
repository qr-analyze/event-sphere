import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';  // Import Alert component
import NavbarComponent from "./Navbar";

const ScheduleForm = ({ addSchedule }) => {
    const [schedule, setSchedule] = useState({
        title: '',
        date: '',
        timeSlot: '',
        speaker: '',
        topic: '',
        location: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!schedule.title || !schedule.date || !schedule.timeSlot || !schedule.speaker || !schedule.topic || !schedule.location) {
            setErrorMessage('All fields are required!');
            setSuccessMessage('');
        } else {
            // Simulate successful form submission (addSchedule can be an API call or function)
            addSchedule(schedule);
            setSuccessMessage('Schedule added successfully!');
            setErrorMessage('');
            setSchedule({
                title: '',
                date: '',
                timeSlot: '',
                speaker: '',
                topic: '',
                location: '',
            });
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Add Schedule</h2>

                {/* Display success and error alerts */}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            placeholder="Enter schedule title"
                            value={schedule.title}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            value={schedule.date}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="timeSlot" className="form-label">Time Slot</label>
                        <input
                            type="text"
                            id="timeSlot"
                            name="timeSlot"
                            className="form-control"
                            placeholder="Enter time slot"
                            value={schedule.timeSlot}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="speaker" className="form-label">Speaker</label>
                        <input
                            type="text"
                            id="speaker"
                            name="speaker"
                            className="form-control"
                            placeholder="Enter speaker name"
                            value={schedule.speaker}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="topic" className="form-label">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            className="form-control"
                            placeholder="Enter topic"
                            value={schedule.topic}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-control"
                            placeholder="Enter location"
                            value={schedule.location}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success">Add Schedule</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ScheduleForm;
