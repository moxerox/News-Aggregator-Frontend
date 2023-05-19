import axios from 'axios';

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api"; 

// Function to make a GET request
export const get = async (url, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a POST request
export const post = async (url, data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a POST request with Bearer token
// const postWithBearer = async (url, data = {}) => {
//     try {
//         const authUser = useAuthUser();
//         const bearerToken = authUser._token
//       const response = await axios.post(`${API_BASE_URL}${url}`, data, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

// Function to make a PUT request
export const put = async (url, data = {}) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a DELETE request
export const del = async (url) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (params) => {
    try {
        const response = await post('/login', params);
        return response;
    } catch (error) {
        throw error;
    }4
}

export const register = async (params) => {
    try {
        const response = await post('/register', params);
        return response;
    } catch (error) {
        throw error;
    }4
}

