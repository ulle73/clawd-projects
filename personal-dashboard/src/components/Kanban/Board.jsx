import React, { useState } from 'react';
import Column from './Column';

function Board({ kanban, setKanban }) {
  const [newCardText, setNewCardText] = useState('');

  const addCard = () => {
    if (!newCardText.trim()) return;
    const newCard = { id: Date.now(), text: newCardText };
    setKanban({
      ...kanban,
      todo: [...kanban.todo, newCard]
    });
    setNewCardText('');
  };

  const deleteCard = (columnId, cardId) => {
    setKanban({
      ...kanban,
      [columnId]: kanban[columnId].filter(card => card.id !== cardId)
    });
  };

  const onDragStart = (e, card, fromColumn) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
    e.dataTransfer.setData('fromColumn', fromColumn);
  };

  const onDrop = (e, toColumn) => {
    const card = JSON.parse(e.dataTransfer.getData('card'));
    const fromColumn = e.dataTransfer.getData('fromColumn');

    if (fromColumn === toColumn) return;

    const newKanban = { ...kanban };
    newKanban[fromColumn] = newKanban[fromColumn].filter(c => c.id !== card.id);
    newKanban[toColumn] = [...newKanban[toColumn], card];
    
    setKanban(newKanban);
  };

  return (
    <section id="kanban">
      <h2>Kanban</h2>
      <div className="board">
        {Object.keys(kanban).map(columnId => (
          <Column 
            key={columnId}
            id={columnId}
            title={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
            cards={kanban[columnId]}
            onDragStart={onDragStart}
            onDrop={onDrop}
            deleteCard={deleteCard}
          />
        ))}
      </div>
      <div className="add-card">
        <input 
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCard()}
          placeholder="New task..."
        />
        <button onClick={addCard}>Add</button>
      </div>
    </section>
  );
}

export default Board;
