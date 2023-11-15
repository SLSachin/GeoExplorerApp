import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_API;

const ApiService = {

    getAllStates: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.get(`${BASE_URL}/api/location/state`, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            throw error
        }
    },

    getLocationsByStateId: async (stateId) => {
        try {
            console.log(stateId)
            const response = await axios.get(`${BASE_URL}/api/location/${stateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addLocation: async (locationData) => {
        try {
            const response = await axios.post(`${BASE_URL}/locations`, locationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    editLocation: async (locationId, updatedData) => {
        try {
            const response = await axios.put(`${BASE_URL}/locations/${locationId}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteLocation: async (locationId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/locations/${locationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ApiService;
