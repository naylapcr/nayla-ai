import axios from 'axios'

const BASE_URL = "https://vjffzqjunrdpebgeihyz.supabase.co/rest/v1"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZmZ6cWp1bnJkcGViZ2VpaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0Mjg3NDgsImV4cCI6MjA5NzAwNDc0OH0.3AtQGP5PyjkrQ6wPcLsBwGSwLVeNpks--Oy0Hf-gQyw"

const getHeaders = () => {
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

export const productsAPI = {
  async getAll() {
    const res = await axios.get(`${BASE_URL}/products?order=created_at.desc`, { headers: getHeaders() })
    return res.data
  },

  async getById(id) {
    const res = await axios.get(`${BASE_URL}/products?id=eq.${id}`, { headers: getHeaders() })
    return res.data
  },

  async create(data) {
    const res = await axios.post(`${BASE_URL}/products`, data, { headers: getHeaders() })
    return res.data
  },

  async update(id, data) {
    const res = await axios.patch(`${BASE_URL}/products?id=eq.${id}`, data, { headers: getHeaders() })
    return res.data
  },

  async delete(id) {
    const res = await axios.delete(`${BASE_URL}/products?id=eq.${id}`, { headers: getHeaders() })
    return res.data
  }
}
