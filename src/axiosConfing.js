// axiosConfig.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://your-api-url.com", // Set your API base URL here
});

// Set up the interceptor for request to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token"); // Get the token from localStorage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
