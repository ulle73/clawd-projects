import React, { useState } from 'react';

function AdminPanel() {
  const [status, setStatus] = useState('Idle');

  const checkGateway = async () => {
    setStatus('Checking...');
    try {
      const res = await fetch('http://127.0.0.1:18789/.status');
      if (res.ok) {
        const data = await res.json();
        setStatus(`Gateway Online: ${data.version || 'OK'}`);
      } else {
        setStatus(`Gateway Error: ${res.status}`);
      }
    } catch (err) {
      setStatus('Gateway Offline');
    }
  };

  const exportState = () => {
    const data = localStorage.getItem('personal-dashboard:v1');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-state.json';
    a.click();
  };

  return (
    <section id="admin" style={{ border: '2px dashed var(--primary)', background: '#fef2f2' }}>
      <h2>Admin / Debug Panel</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button onClick={checkGateway}>Check Gateway Status</button>
        <button onClick={exportState} style={{ background: '#059669' }}>Export State (JSON)</button>
      </div>
      <p><strong>Status:</strong> {status}</p>
      <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
        <p>Project Root: <code>/home/ubuntu/work/clawd-projects/personal-dashboard</code></p>
        <p>Config: <code>CHANGE_REQUEST.md</code></p>
      </div>
    </section>
  );
}

export default AdminPanel;
