import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (data) => api.post('/api/auth/login', data),
    register: (data) => api.post('/api/auth/register', data),
};

// Product APIs
export const productAPI = {
    getAll: () => api.get('/api/products'),
    getById: (id) => api.get(`/api/products/${id}`),
    create: (data) => api.post('/api/products', data),
};

// Order APIs
export const orderAPI = {
    create: (data) => api.post('/api/orders', data),
    getMyOrders: (userId) => api.get(`/api/orders/user/${userId}`),
    getById: (id) => api.get(`/api/orders/${id}`),
};
// Payment APIs
export const paymentAPI = {
    process: (data) => api.post('/api/payments/initiate', data),
};

// Inventory APIs
export const inventoryAPI = {
    getByProduct: (productId) =>
        api.get(`/api/inventory/${productId}`),
};

export default api;