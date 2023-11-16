import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_API;

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        username: username,
        password: password,
      });
      const token = response.data.result.toString();
      localStorage.setItem("token", token);
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: "Invalid credentials" };
    }
  },

  register: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        username,
        password,
      });
      const token = response.data.result.toString();
      localStorage.setItem("token", token);
      return { success: true, message: "Registration successful" };
    } catch (error) {
      return { success: false, message: "Registration failed" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  validateToken: (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        return { isValid: false, error: "Token has expired" };
      }
      return { isValid: true, decodedToken };
    } catch (error) {
      return { isValid: false, error: "Invalid token format" };
    }
  },

  getUserRole: () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      return decodedToken.Role || null;
    } catch (error) {
      return null;
    }
  },
};

export default AuthService;
