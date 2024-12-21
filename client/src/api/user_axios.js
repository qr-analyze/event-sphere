import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/users';

// Function to fetch all users
export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Function to delete a user
export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Function to update a user (edit user)
export const updateUser = async (userId, userData) => {
    try {
        await axios.put(`${API_URL}/${userId}`, userData);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
