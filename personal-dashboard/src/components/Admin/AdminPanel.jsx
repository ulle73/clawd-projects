import { useState } from 'react'

// AdminPanel component - debug tools and gateway status
function AdminPanel() {
  const [gatewayStatus, setGatewayStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkGatewayStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:18789/.status')
      
      if (response.ok) {
        const data = await response.json()
        setGatewayStatus({ success: true, data })
      } else {
        setGatewayStatus({ 
          success: false, 
          error: `HTTP ${response.status}: ${response.statusText}` 
        })
      }
    } catch (error) {
      setGatewayStatus({ 
        success: false, 
        error: `Connection failed: ${error.message}. Gateway may not be running.` 
      })
    } finally {
      setLoading(false)
    }
  }

  const openChangeRequest = () => {
    // Open CHANGE_REQUEST.md in a new tab (file:// protocol)
    const path = '/home/ubuntu/.openclaw/workspace/clawd-projects/personal-dashboard/CHANGE_REQUEST.md'
    alert(`CHANGE_REQUEST.md location:\n${path}\n\nOpen this file in your editor to view the specification.`)
  }

  const clearLocalStorage = () => {
    if (confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
      localStorage.clear()
      alert('Local storage cleared! Refresh the page to see default state.')
    }
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <p className="subtitle">Debug tools and system status</p>

      <div className="admin-section">
        <h3>Gateway Status</h3>
        <button 
          onClick={checkGatewayStatus} 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Gateway Status'}
        </button>

        {gatewayStatus && (
          <div className={`status-result ${gatewayStatus.success ? 'success' : 'error'}`}>
            {gatewayStatus.success ? (
              <>
                <h4>Gateway Online</h4>
                <pre>{JSON.stringify(gatewayStatus.data, null, 2)}</pre>
              </>
            ) : (
              <>
                <h4>Gateway Offline</h4>
                <p>{gatewayStatus.error}</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3>Documentation</h3>
        <button onClick={openChangeRequest} className="btn-secondary">
          Open CHANGE_REQUEST.md
        </button>
      </div>

      <div className="admin-section">
        <h3>Local Storage</h3>
        <p>Current storage key: <code>personal-dashboard:v1</code></p>
        <button onClick={clearLocalStorage} className="btn-danger">
          Clear All Data
        </button>
      </div>

      <div className="admin-section">
        <h3>System Info</h3>
        <table className="info-table">
          <tbody>
            <tr>
              <td>User Agent:</td>
              <td>{navigator.userAgent}</td>
            </tr>
            <tr>
              <td>Platform:</td>
              <td>{navigator.platform}</td>
            </tr>
            <tr>
              <td>Storage Available:</td>
              <td>{typeof localStorage !== 'undefined' ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Current URL:</td>
              <td>{window.location.href}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel
