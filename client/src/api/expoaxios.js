import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expos'; // Replace with your backend URL

// Register a new expo
export const registerExpo = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Update expo details
export const updateExpo = async (expoId, data) => {
    try {
        const response = await axios.put(`${API_URL}/${expoId}/update`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get all expos
export const getAllExpos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get expo by ID
export const getExpoById = async (expoId) => {
    try {
        const response = await axios.get(`${API_URL}/${expoId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Delete expo
export const deleteExpo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting expo:', error);
        throw new Error('Failed to delete expo');
    }
};
