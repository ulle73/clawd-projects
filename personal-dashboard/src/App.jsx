import { useState, useEffect } from 'react'
import Board from './components/Kanban/Board'
import JobsList from './components/AIJobs/JobsList'
import ProjectsList from './components/Projects/ProjectsList'
import RecipesWidget from './components/Recipes/RecipesWidget'
import AdminPanel from './components/Admin/AdminPanel'

const STORAGE_KEY = 'personal-dashboard:v1'

// Main App component - handles layout and state persistence
function App() {
  const [activeTab, setActiveTab] = useState('kanban')
  const [state, setState] = useState(() => {
    // Load state from localStorage on mount
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved state:', e)
      }
    }
    
    // Default initial state
    return {
      kanban: {
        columns: {
          todo: { id: 'todo', title: 'To Do', cards: [] },
          doing: { id: 'doing', title: 'Doing', cards: [] },
          done: { id: 'done', title: 'Done', cards: [] }
        }
      },
      aiJobs: [],
      projects: []
    }
  })

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Update Kanban state
  const updateKanban = (newKanbanState) => {
    setState(prev => ({ ...prev, kanban: newKanbanState }))
  }

  // Update AI Jobs state
  const updateJobs = (newJobs) => {
    setState(prev => ({ ...prev, aiJobs: newJobs }))
  }

  // Update Projects state
  const updateProjects = (newProjects) => {
    setState(prev => ({ ...prev, projects: newProjects }))
  }

  // Export state as JSON
  const exportState = () => {
    const dataStr = JSON.stringify(state, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dashboard-state-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Import state from JSON
  const importState = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        setState(imported)
        alert('State imported successfully!')
      } catch (error) {
        alert('Failed to import state: ' + error.message)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Personal Dashboard</h1>
        <nav className="tabs">
          <button 
            className={activeTab === 'kanban' ? 'active' : ''} 
            onClick={() => setActiveTab('kanban')}
          >
            Kanban
          </button>
          <button 
            className={activeTab === 'jobs' ? 'active' : ''} 
            onClick={() => setActiveTab('jobs')}
          >
            AI Jobs
          </button>
          <button 
            className={activeTab === 'projects' ? 'active' : ''} 
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'recipes' ? 'active' : ''} 
            onClick={() => setActiveTab('recipes')}
          >
            Recipes
          </button>
          <button 
            className={activeTab === 'admin' ? 'active' : ''} 
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </nav>
        <div className="actions">
          <button onClick={exportState} className="btn-secondary">Export</button>
          <label className="btn-secondary">
            Import
            <input 
              type="file" 
              accept="application/json" 
              onChange={importState} 
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'kanban' && (
          <Board 
            columns={state.kanban.columns} 
            onUpdate={updateKanban}
          />
        )}
        
        {activeTab === 'jobs' && (
          <JobsList 
            jobs={state.aiJobs} 
            onUpdate={updateJobs}
          />
        )}
        
        {activeTab === 'projects' && (
          <ProjectsList 
            projects={state.projects} 
            onUpdate={updateProjects}
          />
        )}
        
        {activeTab === 'recipes' && (
          <RecipesWidget />
        )}
        
        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>
    </div>
  )
}

export default App
