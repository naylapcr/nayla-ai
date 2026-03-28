import './custom.css';

// 1. Profile 
const Profile = () => (
  <div className="card span-3" style={{ background: '#3B82F6', color: 'white', position: 'relative' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
      {/* Frame Foto */}
      <div style={{ position: 'relative' }}>
        <img 
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Aiden&backgroundColor=ffffff" 
          style={{ width: '110px', height: '110px', background: 'white', borderRadius: '25px', border: '4px solid black' }} 
          alt="avatar" 
        />
        <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#34D399', padding: '4px 10px', borderRadius: '10px', border: '2px solid black', color: 'black', fontSize: '0.6rem', fontWeight: 'bold' }}>
          LIVE_
        </div>
      </div>

      <div style={{ flex: 1, textAlign: 'left' }}> 
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontFamily: 'Chakra Petch', 
          fontSize: '2.8rem', 
          letterSpacing: '-2px',
          lineHeight: '1'
        }}>
          Nayla Saffana Chalisa
        </h1>
        
        {/* Role Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}> {/* marginBottom: '20px' untuk jarak ke garis bawah */}
          <span style={{ background: 'black', color: 'white', padding: '4px 12px', borderRadius: '5px', fontSize: '0.7rem' }}>#SI_STUDENT</span>
          <span style={{ background: 'white', color: 'black', padding: '4px 12px', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold' }}>#DEV_IN_PROGRESS</span>
          <span style={{ background: '#34D399', color: 'black', padding: '4px 12px', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold' }}>#TECH_STACK_STUDY</span>
        </div>

        {/* Garis Pemisah & Stats */}
        <div style={{ 
          display: 'flex', 
          gap: '30px', 
          borderTop: '2px solid rgba(255,255,255,0.2)', 
          paddingTop: '15px' 
        }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>128</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.8 }}>TOTAL COMMITS</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>∞</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.8 }}>CUP OF COFFEE</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>99+</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.8 }}>BUGS FOUND</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 2. Social Connect
const Connect = () => (
  <div className="card" style={{background: '#F472B6'}}>
    <h2 style={{background: '#34D399'}}>CONNECT</h2>
    <div style={{fontSize: '0.9rem', fontWeight: 'bold', color: 'white'}}>
      <p>🔗 linkedin.com/in/nayla-saffana</p>
      <p>💻 github.com/naylapcr</p>
      <p>📧 nayla24si@mahasiswa.pcr.ac.id</p>
    </div>
  </div>
);

// 3. About Me 
const About = () => {
  return (
    <div className="card span-2">
      <h2 style={{ background: '#34D399' }}>PROFILE_LOG</h2>
      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#111827' }}>
        Mahasiswa <strong>Sistem Informasi</strong> yang suka eksplorasi <em>modern web development</em>. 
        Lagi fokus mendalami Laravel dan React buat bangun aplikasi yang fungsional. 
        Senang memecahkan masalah lewat baris kode dan optimasi database.
      </p>
    </div>
  );
};

// 4. Child: keahlian
const Skills = () => {
  const list = ['React', 'Laravel', 'PHP', 'Python', 'SQL', 'Data Mining', 'UX Design', 'Git', 'Vite'];
  return (
    <div className="card row-2" style={{background: '#FDE047'}}>
      <h2 style={{background: '#34D399'}}>TECH_STACK</h2>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {list.map(s => <span key={s} className="skill-tag">{s}</span>)}
      </div>
      <p style={{marginTop: 'auto', fontSize: '0.7rem'}}>*Selalu belajar hal baru!</p>
    </div>
  );
};

// 5. Child: Motto 
const Motto = () => {
  return (
    <div className="card" style={{ textAlign: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <p style={{ fontWeight: '800', fontSize: '1.1rem', color: '#3B82F6', margin: 0 }}>
        "Logic over luck." 💻
      </p>
    </div>
  );
};

// 6. Child: Education
const Education = () => (
  <div className="card">
    <h2 style={{background: '#34D399'}}>ACADEMIC</h2>
    <p style={{fontSize: '1.2rem'}}><strong>Politeknik Caltex Riau</strong></p>
    <p style={{fontSize: '0.9rem'}}>D4 Sistem Informasi</p>
  </div>
);

// 7. Child: Interest (Real & Relevant)
const Interest = () => {
  return (
    <div className="card" style={{ background: '#6EE7B7' }}>
      <h2 style={{ background: 'white' }}>INTERESTS</h2>
      <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827', margin: 0 }}>
        UI/UX Design, Open Source Project, Data Analytics.
      </p>
    </div>
  );
};

// 8. Child: Featured Projects
const Projects = () => (
  <div className="card span-2">
    <h2 style={{background: '#34D399'}}>PROJECTS.EXE</h2>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
      <div style={{border: '2px solid black', padding: '8px', borderRadius: '10px', background: '#F3F4F6'}}>
        <strong>• Web Layanan Surat</strong>
        <p style={{fontSize: '0.7rem'}}>Laravel/PHP</p>
      </div>
      <div style={{border: '2px solid black', padding: '8px', borderRadius: '10px', background: '#F3F4F6'}}>
        <strong>• UX SDG Design</strong>
        <p style={{fontSize: '0.7rem'}}>UI/UX Research</p>
      </div>
    </div>
  </div>
);

// 9. Child: Status/Update
const Status = () => (
  <div className="card" style={{borderColor: '#34D399'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
      <div style={{width: '10px', height: '10px', background: 'green', borderRadius: '50%'}}></div>
      <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>ONLINE</span>
    </div>
    <p style={{fontSize: '0.8rem', marginTop: '10px'}}>Sedang mengerjakan Tugas React...</p>
  </div>
);

// PARENT COMPONENT 
function App() {
  return (
    <div className="container">
      <div className="span-full">
        <Profile />
      </div>
      <About />      
      <Skills />     
      <Education />  
      <Interest />   
      <div className="span-2">
        <Projects />
      </div>
      <Connect />
      <Motto />
      <div className="span-2">
        <Status />
      </div>
    </div>
  );
}

export default App;