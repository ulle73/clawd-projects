import { useState } from 'react'

// AIJobs component - manages revenue-generating AI job ideas
function JobsList({ jobs, onUpdate }) {
  const [newJobTitle, setNewJobTitle] = useState('')
  const [newJobDescription, setNewJobDescription] = useState('')

  // Sample job ideas based on user interests (golf, trading, automation, AI)
  const sampleJobs = [
    {
      id: 'sample-1',
      title: 'Golf Score Tracker App',
      description: 'Build a simple mobile-first web app to track golf scores, analyze trends, and share with friends. Monetize via ads or premium features.',
      category: 'golf',
      completed: false
    },
    {
      id: 'sample-2',
      title: 'Trading Signal Bot',
      description: 'Create a Telegram bot that sends automated trading signals based on technical indicators. Subscription model $10-50/month.',
      category: 'trading',
      completed: false
    },
    {
      id: 'sample-3',
      title: 'Document Auto-Organizer',
      description: 'AI-powered tool that automatically categorizes and organizes documents/emails. SaaS pricing starting at $9/month.',
      category: 'automation',
      completed: false
    }
  ]

  const allJobs = jobs.length > 0 ? jobs : sampleJobs

  const handleAddJob = () => {
    if (newJobTitle.trim()) {
      const newJob = {
        id: Date.now().toString(),
        title: newJobTitle,
        description: newJobDescription,
        category: 'custom',
        completed: false,
        createdAt: new Date().toISOString()
      }
      
      onUpdate([...jobs, newJob])
      setNewJobTitle('')
      setNewJobDescription('')
    }
  }

  const toggleJobCompletion = (jobId) => {
    const updatedJobs = allJobs.map(job =>
      job.id === jobId ? { ...job, completed: !job.completed } : job
    )
    onUpdate(updatedJobs)
  }

  const deleteJob = (jobId) => {
    const updatedJobs = allJobs.filter(job => job.id !== jobId)
    onUpdate(updatedJobs)
  }

  return (
    <div className="jobs-container">
      <h2>Revenue Ideas & AI Jobs</h2>
      <p className="subtitle">
        Daily suggestions for small revenue-driving projects based on your interests
        (golf, trading, automation, AI)
      </p>

      <div className="jobs-list">
        {allJobs.map(job => (
          <div key={job.id} className={`job-card ${job.completed ? 'completed' : ''}`}>
            <div className="job-header">
              <input
                type="checkbox"
                checked={job.completed}
                onChange={() => toggleJobCompletion(job.id)}
              />
              <h3>{job.title}</h3>
              <span className="job-category">{job.category}</span>
            </div>
            <p>{job.description}</p>
            <button 
              className="btn-delete" 
              onClick={() => deleteJob(job.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="add-job">
        <h3>Add New Job Idea</h3>
        <input
          type="text"
          placeholder="Job title..."
          value={newJobTitle}
          onChange={(e) => setNewJobTitle(e.target.value)}
        />
        <textarea
          placeholder="Description and monetization strategy..."
          value={newJobDescription}
          onChange={(e) => setNewJobDescription(e.target.value)}
          rows="3"
        />
        <button onClick={handleAddJob} className="btn-primary">
          Add Job
        </button>
      </div>
    </div>
  )
}

export default JobsList
