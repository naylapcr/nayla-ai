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

export const leadsAPI = {
  async create(leadData) {
    try {
      const res = await axios.post(`${BASE_URL}/crm_leads`, leadData, { headers: getHeaders() });
      return res.data;
    } catch (err) {
      console.warn("Supabase crm_leads table not found / RLS error. Saving to fallback localStorage:", err?.response?.data || err.message);
      const existingLeads = JSON.parse(localStorage.getItem('luneve_leads') || '[]');
      const newLead = {
        id: "local-" + Date.now(),
        ...leadData,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('luneve_leads', JSON.stringify([newLead, ...existingLeads]));
      return [newLead];
    }
  }
};
