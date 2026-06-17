import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-content">
        <h1>Welcome Home 🏠</h1>
        <p>This is a simple <strong>React Router DOM</strong> demo showing how to navigate between pages without a full page reload.</p>
        <div className="card-row">
          <div className="card">
            <span className="icon">🔗</span>
            <h3>Client-side Routing</h3>
            <p>Navigate instantly without reloading the page.</p>
          </div>
          <div className="card">
            <span className="icon">📄</span>
            <h3>Multiple Pages</h3>
            <p>Home, About, and Contact — each its own route.</p>
          </div>
          <div className="card">
            <span className="icon">✨</span>
            <h3>Active Links</h3>
            <p>The navbar highlights the current active page.</p>
          </div>
        </div>
        <button className="btn" onClick={() => navigate('/about')}>Learn More →</button>
      </div>
    </div>
  )
}

export default Home
