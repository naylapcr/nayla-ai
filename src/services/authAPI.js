import axios from 'axios'

// PERBAIKAN: Tambahkan kata 'users' di akhir URL agar menunjuk langsung ke tabel database kamu
const API_URL = "https://vjffzqjunrdpebgeihyz.supabase.co/rest/v1/users"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZmZ6cWp1bnJkcGViZ2VpaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0Mjg3NDgsImV4cCI6MjA5NzAwNDc0OH0.3AtQGP5PyjkrQ6wPcLsBwGSwLVeNpks--Oy0Hf-gQyw"

export const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('luneve_user') || '{}');
    return {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
        ...(user.role ? { "X-User-Role": user.role } : {}),
        ...(user.id ? { "X-User-Id": user.id } : {})
    };
};

export const authAPI = {
    
    async login(email, password) {
        const response = await axios.get(`${API_URL}?email=eq.${email}&password=eq.${password}`, { headers: getHeaders() })
        return response.data 
    },

    
    async register(userData) {
        const response = await axios.post(API_URL, userData, { headers: getHeaders() })
        return response.data
    },

    
    async checkEmailExists(email) {
        const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers: getHeaders() })
        return response.data
    },

    
    async resetPassword(email, newPassword) {
        const response = await axios.patch(`${API_URL}?email=eq.${email}`, { password: newPassword }, { headers: getHeaders() })
        return response.data
    }
}