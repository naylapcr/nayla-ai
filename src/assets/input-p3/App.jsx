import React, { useState } from 'react';

function App() {
  // 1. State untuk Form Input
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    umur: '',
    divisi: '',
    level: ''
  });

  // 2. State untuk Error Alert
  const [errors, setErrors] = useState({});
  
  // 3. State untuk Hasil (Conditional Rendering)
  const [submittedData, setSubmittedData] = useState(null);

  // Fungsi Validasi
  const validate = (name, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "Bidang ini wajib diisi!";
    } else {
      if (name === "nama" && value.length < 3) errorMsg = "Minimal 3 karakter!";
      if (name === "nama" && /\d/.test(value)) errorMsg = "Nama tidak boleh ada angka!";
      if (name === "email" && !value.includes("@")) errorMsg = "Email harus valid (pakai @)!";
      if (name === "umur" && (isNaN(value) || value < 17)) errorMsg = "Harus angka & minimal 17 tahun!";
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validasi Real-time
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Cek apakah semua field valid & terisi
  const isFormValid = 
    Object.values(formData).every(val => val !== "") && 
    Object.values(errors).every(err => err === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); // Simpan hasil inputan
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div className="card" style={{ background: '#FFF', padding: '30px' }}>
        <h2 style={{ marginBottom: '20px', background: '#3B82F6', color: 'white', padding: '10px' }}>
          FORM PENGAJUAN SERTIFIKASI
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 3 INPUTAN */}
          <InputGroup label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} error={errors.nama} />
          <InputGroup label="Email Mahasiswa" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputGroup label="Umur" type="number" name="umur" value={formData.umur} onChange={handleChange} error={errors.umur} />

          {/* 2 SELECT DROPDOWN */}
          <InputGroup 
            label="Divisi Keahlian" type="select" name="divisi" 
            options={["Frontend Developer", "Backend Developer", "UI/UX Designer"]} 
            value={formData.divisi} onChange={handleChange} error={errors.divisi} 
          />
          <InputGroup 
            label="Level Sertifikasi" type="select" name="level" 
            options={["Junior", "Intermediate", "Expert"]} 
            value={formData.level} onChange={handleChange} error={errors.level} 
          />

          {/* CONDITIONAL RENDERING: Tombol Submit hanya muncul jika valid */}
          {isFormValid && (
            <button type="submit" style={{ 
              width: '100%', padding: '15px', background: '#34D399', 
              fontWeight: 'bold', border: '3px solid black', cursor: 'pointer', borderRadius: '10px' 
            }}>
              KIRIM PENGAJUAN 🚀
            </button>
          )}
        </form>

        {/* HASIL RESPON (Conditional Rendering) */}
        {submittedData && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#F8FAFC', border: '2px dashed black' }}>
            <h3>✅ Pengajuan Diterima!</h3>
            <p>Halo <strong>{submittedData.nama}</strong>, kamu telah terdaftar di divisi <strong>{submittedData.divisi}</strong> level <strong>{submittedData.level}</strong>.</p>
            <p>Konfirmasi dikirim ke: <em>{submittedData.email}</em></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;