import React, { useState } from 'react';
import InputGroup from './components/InputGroup.jsx';


export default function BugReportForm(){
const BugReportForm = () => {
  const [formData, setFormData] = useState({ reporter: '', project: '', description: '', category: '', priority: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const validate = (name, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "THIS FIELD IS REQUIRED!";
    } else {
      if (name === "reporter") {
        if (value.length < 3) errorMsg = "MIN 3 CHARACTERS!";
        if (/\d/.test(value)) errorMsg = "NO NUMBERS IN NAME!";
      }
      if (name === "project" && value.length < 5) errorMsg = "PROJECT NAME TOO SHORT!";
      if (name === "description" && value.length < 10) errorMsg = "GIVE MORE DETAIL (MIN 10 CHARS)!";
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  // Reaktif: Mengubah warna & mood form berdasarkan prioritas
  const getStyle = () => {
    switch(formData.priority) {
      case 'Critical': return { bg: '#FEE2E2', accent: '#EF4444', text: '🚨 CRITICAL ERROR' };
      case 'Medium': return { bg: '#FEF3C7', accent: '#F59E0B', text: '⚠️ MEDIUM BUG' };
      case 'Low': return { bg: '#D1FAE5', accent: '#10B981', text: '✅ LOW ISSUE' };
      default: return { bg: '#F1F5F9', accent: '#6366F1', text: '🛠️ BUG REPORT' };
    }
  };

  const isFormValid = Object.values(formData).every(v => v !== "") && Object.values(errors).every(e => e === "");

  return (
    <div style={{ 
      padding: '60px 20px', background: '#F8FAFC', minHeight: '100vh', 
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      <div style={{ 
        maxWidth: '500px', width: '100%', 
        background: getStyle().bg, 
        border: '4px solid #111827', padding: '40px', 
        boxShadow: '12px 12px 0 #111827', borderRadius: '20px',
        transition: 'all 0.5s ease'
      }}>
        
        {/* Header Dynamic Badge */}
        <div style={{ 
          background: getStyle().accent, color: 'white', border: '3px solid #111827', 
          padding: '12px', borderRadius: '12px', marginBottom: '35px',
          boxShadow: '5px 5px 0 #111827', textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontWeight: '900', fontSize: '1.2rem' }}>{getStyle().text}</h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(formData); }}>
          <InputGroup label="Reporter Name" name="reporter" value={formData.reporter} onChange={handleChange} error={errors.reporter} />
          <InputGroup label="Project Name" name="project" value={formData.project} onChange={handleChange} error={errors.project} />
          <InputGroup label="Bug Description" name="description" value={formData.description} onChange={handleChange} error={errors.description} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <InputGroup label="Category" type="select" name="category" options={["Frontend", "Backend", "UI/UX"]} value={formData.category} onChange={handleChange} />
            <InputGroup label="Priority" type="select" name="priority" options={["Low", "Medium", "Critical"]} value={formData.priority} onChange={handleChange} />
          </div>

          {/* Conditional Rendering: Submit Button with Interactive States */}
          {isFormValid && (
            <button 
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                width: '100%', padding: '18px', 
                background: isHovered ? '#111827' : getStyle().accent, 
                color: 'white', fontWeight: '900', border: '3px solid #111827', 
                cursor: 'pointer', borderRadius: '12px', marginTop: '10px',
                boxShadow: isHovered ? '4px 4px 0 #334155' : '8px 8px 0 #111827',
                transform: isHovered ? 'translateY(-3px)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              GENERATE TICKET ⚡
            </button>
          )}
        </form>

        {/* Success Feedback Card */}
        {submitted && (
          <div style={{ 
            marginTop: '35px', padding: '25px', border: '4px solid #111827', 
            background: 'white', borderRadius: '15px', boxShadow: '10px 10px 0 #34D399',
            animation: 'fadeIn 0.5s ease'
          }}>
            <h3 style={{ marginTop: 0, color: '#059669' }}>✅ TICKET SUBMITTED!</h3>
            <hr style={{ border: '1px solid #E2E8F0', margin: '15px 0' }} />
            <p style={{ margin: '5px 0' }}><strong>ID:</strong> #{Math.floor(Math.random() * 9999)}</p>
            <p style={{ margin: '5px 0' }}><strong>To:</strong> {submitted.project}</p>
            <p style={{ margin: '5px 0', fontSize: '0.9rem', fontStyle: 'italic' }}>"{submitted.description}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
}