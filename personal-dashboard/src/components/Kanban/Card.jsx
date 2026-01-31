import React from 'react';

function Card({ card, columnId, onDragStart, deleteCard }) {
  return (
    <div 
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, card, columnId)}
    >
      {card.text}
      <button 
        className="del-btn"
        onClick={() => deleteCard(columnId, card.id)}
      >
        ×
      </button>
    </div>
  );
}

export default Card;
