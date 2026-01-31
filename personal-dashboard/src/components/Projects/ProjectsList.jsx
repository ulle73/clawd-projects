import React, { useState, useEffect } from 'react';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => setProjects(data))
      .catch(err => {
        setError('Scan projects unavailable. Run gateway to enable.');
        // Fallback placeholder
        setProjects(['personal-dashboard', 'market-bot', 'golf-tracker']);
      });
  }, []);

  return (
    <section id="projects">
      <h2>Active Projects</h2>
      {error && <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>{error}</p>}
      <ul id="projects-list">
        {projects.map((proj, i) => (
          <li key={i}>{proj}</li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsList;
