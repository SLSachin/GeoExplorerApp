import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_API;

const AuthService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, { "username": username, "password": password });
            console.log(response);
            const token = response.data.result.toString();
            // Store the token in localStorage or a more secure storage
            localStorage.setItem('token', token);
            console.log(await localStorage.getItem('token'));
            return { success: true, message: 'Login successful' };
        } catch (error) {
            return { success: false, message: 'Invalid credentials' };
        }
    },

    register: async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, { username, password });
            const { token, user } = response.data;
            // Store the token in localStorage or a more secure storage
            localStorage.setItem('token', token);
            return { success: true, user };
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    },

    logout: () => {
        // Remove the token from localStorage or the storage you used
        localStorage.removeItem('token');
    },


    // validateToken: (token) => {
    //     try {
    //         console.log(process.env.REACT_APP_JWT_SECRET);
    //         jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
    //             if (err) {
    //                 throw err;
    //             } else {
    //                 return { success: true, message: `Valid token: ${decoded}` };
    //             }
    //         });
    //     } catch (error) {
    //         return { success: false, message: 'Invalid token' };
    //     }
    // },

    isAdmin: (user) => {
        return user && user.role === 'admin';
    },

    // Additional methods if needed, e.g., check if the user is authenticated
};

export default AuthService;
