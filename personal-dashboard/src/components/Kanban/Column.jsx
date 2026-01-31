import React from 'react';
import Card from './Card';

function Column({ id, title, cards, onDragStart, onDrop, deleteCard }) {
  return (
    <div 
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, id)}
    >
      <h3>{title}</h3>
      <div className="cards">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            columnId={id}
            onDragStart={onDragStart}
            deleteCard={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
