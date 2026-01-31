import React, { useState, useEffect } from 'react';
import Board from './components/Kanban/Board';
import JobsList from './components/AIJobs/JobsList';
import ProjectsList from './components/Projects/ProjectsList';
import RecipesWidget from './components/Recipes/RecipesWidget';
import AdminPanel from './components/Admin/AdminPanel';

const STORAGE_KEY = 'personal-dashboard:v1';

function App() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      kanban: {
        todo: [],
        doing: [],
        done: []
      },
      jobs: [],
      projects: []
    };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateKanban = (newKanban) => {
    setState(prev => ({ ...prev, kanban: newKanban }));
  };

  const updateJobs = (newJobs) => {
    setState(prev => ({ ...prev, jobs: newJobs }));
  };

  return (
    <div className="container">
      <header>
        <h1>Personal Dashboard</h1>
        <p>Stay in flow. Build ideas. Eat well.</p>
        <button 
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          style={{ marginTop: '10px', background: '#6b7280' }}
        >
          {isAdminOpen ? 'Close Admin' : 'Admin Panel'}
        </button>
      </header>

      {isAdminOpen && <AdminPanel />}

      <main>
        <div className="left-col">
          <Board kanban={state.kanban} setKanban={updateKanban} />
          <JobsList jobs={state.jobs} setJobs={updateJobs} />
        </div>

        <div className="right-col">
          <RecipesWidget />
          <ProjectsList />
        </div>
      </main>
    </div>
  );
}

export default App;
