import { useState } from 'react'

// Card component - displays a single Kanban card
function Card({ card, onDelete }) {
  return (
    <div className="kanban-card" draggable>
      <div className="card-content">
        <p>{card.text}</p>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(card.id)}
          title="Delete card"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Card
