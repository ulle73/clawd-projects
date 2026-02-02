import { useState } from 'react'
import Column from './Column'

// Board component - main Kanban board container
function Board({ columns, onUpdate }) {
  
  // Add a new card to a column
  const handleAddCard = (columnId, text) => {
    const newCard = {
      id: Date.now().toString(),
      text: text,
      createdAt: new Date().toISOString()
    }
    
    const updatedColumns = { ...columns }
    updatedColumns[columnId].cards = [...updatedColumns[columnId].cards, newCard]
    
    onUpdate({ columns: updatedColumns })
  }

  // Delete a card from a column
  const handleDeleteCard = (cardId) => {
    const updatedColumns = { ...columns }
    
    // Find and remove the card from its column
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].cards = updatedColumns[columnId].cards.filter(
        card => card.id !== cardId
      )
    })
    
    onUpdate({ columns: updatedColumns })
  }

  // Handle drag and drop between columns
  const handleDrop = (cardId, fromColumnId, toColumnId) => {
    if (fromColumnId === toColumnId) return

    const updatedColumns = { ...columns }
    
    // Find the card in the source column
    const card = updatedColumns[fromColumnId].cards.find(c => c.id === cardId)
    if (!card) return

    // Remove from source column
    updatedColumns[fromColumnId].cards = updatedColumns[fromColumnId].cards.filter(
      c => c.id !== cardId
    )
    
    // Add to destination column
    updatedColumns[toColumnId].cards = [...updatedColumns[toColumnId].cards, card]
    
    onUpdate({ columns: updatedColumns })
  }

  return (
    <div className="kanban-board">
      {Object.values(columns).map(column => (
        <Column
          key={column.id}
          column={column}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}

export default Board
