import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-content">
        <h1>About Us 👋</h1>
        <p>We built this demo to show how <strong>React Router DOM v6</strong> makes single-page apps feel like multi-page websites.</p>
        <div className="info-list">
          <div className="info-item"><span>📦</span> <span>Package: <code>react-router-dom</code></span></div>
          <div className="info-item"><span>🚀</span> <span>Version: v6</span></div>
          <div className="info-item"><span>⚙️</span> <span>Built with: React + Vite</span></div>
          <div className="info-item"><span>🛣️</span> <span>Routes: <code>&lt;Routes&gt;</code> + <code>&lt;Route&gt;</code></span></div>
          <div className="info-item"><span>🔗</span> <span>Links: <code>&lt;NavLink&gt;</code> with active state</span></div>
          <div className="info-item"><span>📡</span> <span>Navigate: <code>useNavigate()</code> hook</span></div>
        </div>
        <button className="btn" onClick={() => navigate('/contact')}>Contact Us →</button>
      </div>
    </div>
  )
}

export default About
