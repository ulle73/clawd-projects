import { useState, useEffect } from 'react'

// ProjectsList component - displays projects from /home/ubuntu/work/clawd-projects
function ProjectsList({ projects, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const scanProjects = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Try to fetch from /api/projects endpoint (if backend is available)
      const response = await fetch('/api/projects')
      
      if (response.ok) {
        const data = await response.json()
        onUpdate(data.projects || [])
      } else {
        throw new Error('API endpoint not available')
      }
    } catch (err) {
      // Fallback: show placeholder and instruction
      setError('Projects API endpoint not available. To enable project detection, set up a backend endpoint at /api/projects that lists folders under /home/ubuntu/work/clawd-projects')
      
      // Show sample placeholder data
      const placeholderProjects = [
        { name: 'personal-dashboard', path: '/home/ubuntu/work/clawd-projects/personal-dashboard', type: 'React App' },
        { name: 'Sample Project', path: '/home/ubuntu/work/clawd-projects/sample', type: 'Placeholder' }
      ]
      onUpdate(placeholderProjects)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="projects-container">
      <h2>Active Projects</h2>
      <p className="subtitle">
        Projects detected under /home/ubuntu/work/clawd-projects
      </p>

      <button 
        onClick={scanProjects} 
        className="btn-primary"
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan Projects'}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <p className="placeholder">Click "Scan Projects" to detect active projects</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.name}</h3>
              <p className="project-path">{project.path}</p>
              {project.type && <span className="project-type">{project.type}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectsList
