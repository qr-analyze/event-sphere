import axios from 'axios';

const API_URL = 'http://localhost:5000/api/exhibitors'; // Replace with your backend URL

// Register a new exhibitor
export const registerExhibitor = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Update exhibitor profile
export const updateExhibitor = async (exhibitorId, data) => {
    try {
        const response = await axios.put(`${API_URL}/${exhibitorId}/update`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get all exhibitors
export const getAllExhibitors = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get exhibitor by ID
export const getExhibitorById = async (exhibitorId) => {
    try {
        const response = await axios.get(`${API_URL}/${exhibitorId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Approve exhibitor
export const approveExhibitor = async (exhibitorId) => {
    try {
        const response = await axios.patch(`${API_URL}/${exhibitorId}/approve`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Delete exhibitor
export const deleteExhibitor = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting exhibitor:', error);
        throw new Error('Failed to delete exhibitor');
    }
};
