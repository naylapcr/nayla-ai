import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import CSS global (tempat kamu manggil @tailwind base, dll)
import './' 

// Import halaman tugas pertemuan 4 kamu
import LayananIT from './pages/LayananIT.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Langsung tampilkan komponen utama tugas P4 */}
    <LayananIT />
  </StrictMode>,
)