import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/schedules';

// Fetch all schedules
export const fetchSchedules = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// Add a new schedule
export const addSchedule = async (schedule) => {
    const response = await axios.post(BASE_URL, schedule, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

// Delete a schedule by ID
export const deleteSchedule = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};

// Edit an existing schedule
export const editSchedule = async (updatedSchedule) => {
    const response = await axios.put(
        `${BASE_URL}/${updatedSchedule._id}`,
        updatedSchedule,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    return response.data;
};
