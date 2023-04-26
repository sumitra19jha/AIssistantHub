import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        if (AUTH_TOKEN) {
            config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Handle 401 error here
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;
