import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_API;

const ApiService = {

    getAllStates: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/location/state`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error
        }
    },

    getLocationsByStateId: async (stateId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/location/${stateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching locations for given state:', error);
        }
    },

    addLocation: async (locationData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              };
            const response = await axios.post(`${BASE_URL}/api/location`, locationData, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    editLocation: async (locationId, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              };
            const response = await axios.put(`${BASE_URL}/api/location/${locationId}`, updatedData, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteLocation: async (locationId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/location/${locationId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ApiService;
