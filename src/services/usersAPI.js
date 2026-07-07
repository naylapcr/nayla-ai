import axios from 'axios';

const API_URL = "https://vjffzqjunrdpebgeihyz.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZmZ6cWp1bnJkcGViZ2VpaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0Mjg3NDgsImV4cCI6MjA5NzAwNDc0OH0.3AtQGP5PyjkrQ6wPcLsBwGSwLVeNpks--Oy0Hf-gQyw";

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('luneve_user') || '{}');
    return {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
        ...(user.role ? { "X-User-Role": user.role } : { "X-User-Role": "admin" }),
        ...(user.id ? { "X-User-Id": user.id } : {})
    };
};

export const usersAPI = {
    async getAll() {
        const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers: getHeaders() });
        return response.data;
    },

    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers: getHeaders() });
        return response.data;
    },

    async create(userData) {
        const response = await axios.post(API_URL, userData, { headers: getHeaders() });
        return response.data;
    },

    async update(id, userData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, userData, { headers: getHeaders() });
        return response.data;
    },

    async delete(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers: getHeaders() });
        return response.data;
    }
};
