import React, { useState } from 'react';

function JobsList({ jobs, setJobs }) {
  const [newJobText, setNewJobText] = useState('');

  const addJob = () => {
    if (!newJobText.trim()) return;
    const newJob = { 
      id: Date.now(), 
      text: newJobText, 
      done: false,
      revenue: Math.random() > 0.5 ? '$$' : '$'
    };
    setJobs([...jobs, newJob]);
    setNewJobText('');
  };

  const toggleJob = (id) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, done: !job.done } : job
    ));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <section id="ai-jobs">
      <h2>Revenue Ideas & AI Jobs</h2>
      <ul id="jobs">
        {jobs.map(job => (
          <li key={job.id} style={{ textDecoration: job.done ? 'line-through' : 'none' }}>
            <span onClick={() => toggleJob(job.id)} style={{ cursor: 'pointer' }}>
              {job.text} <small style={{ color: '#10b981' }}>{job.revenue}</small>
            </span>
            <button 
              className="del-btn-small"
              onClick={() => deleteJob(job.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="add-card">
        <input 
          value={newJobText}
          onChange={(e) => setNewJobText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addJob()}
          placeholder="New revenue idea..."
        />
        <button onClick={addJob}>Add Idea</button>
      </div>
    </section>
  );
}

export default JobsList;
