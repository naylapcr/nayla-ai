import React from 'react';

const InputGroup = ({ label, type = "text", name, value, onChange, error, options }) => {
  return (
    <div style={{ marginBottom: '22px', textAlign: 'left' }}>
      <label style={{ 
        display: 'block', fontWeight: '800', marginBottom: '8px', 
        fontSize: '0.75rem', letterSpacing: '1px', color: '#334155' 
      }}>{label}</label>
      
      <div style={{ position: 'relative' }}>
        {type === "select" ? (
          <select 
            name={name} value={value} onChange={onChange}
            style={{ 
              width: '100%', padding: '14px', border: '3px solid #111827', 
              boxShadow: '6px 6px 0 #111827', borderRadius: '8px', 
              outline: 'none', fontWeight: '700', cursor: 'pointer', background: 'white'
            }}
          >
            <option value="">-- CHOOSE {label} --</option>
            {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type={type} name={name} value={value} onChange={onChange}
            placeholder={`Enter ${label}...`}
            style={{ 
              width: '100%', padding: '14px', border: '3px solid #111827', 
              boxShadow: '6px 6px 0 #111827', boxSizing: 'border-box', 
              outline: 'none', fontWeight: '700', fontSize: '1rem',
              borderRadius: '8px', transition: 'all 0.3s ease'
            }}
          />
        )}
      </div>

      {/* Alert Error yang Aesthetic */}
      {error && (
        <div style={{ 
          background: '#FFF1F2', color: '#E11D48', marginTop: '10px', 
          fontSize: '0.8rem', fontWeight: '800', border: '2px solid #E11D48', 
          padding: '8px', borderRadius: '6px', boxShadow: '3px 3px 0 #E11D48' 
        }}>
          ❗ {error}
        </div>
      )}
    </div>
  );
};

export default InputGroup;