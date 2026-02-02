import { useState } from 'react'
import Card from './Card'

// Column component - displays a Kanban column with cards
function Column({ column, onAddCard, onDeleteCard, onDrop }) {
  const [newCardText, setNewCardText] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const handleAddCard = () => {
    if (newCardText.trim()) {
      onAddCard(column.id, newCardText)
      setNewCardText('')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const cardData = e.dataTransfer.getData('cardData')
    if (cardData) {
      const { cardId, fromColumnId } = JSON.parse(cardData)
      onDrop(cardId, fromColumnId, column.id)
    }
  }

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('cardData', JSON.stringify({
      cardId: card.id,
      fromColumnId: column.id
    }))
  }

  return (
    <div 
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>{column.title}</h2>
      
      <div className="cards-container">
        {column.cards.map(card => (
          <div 
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
          >
            <Card 
              card={card} 
              onDelete={onDeleteCard}
            />
          </div>
        ))}
      </div>

      <div className="add-card">
        <input
          type="text"
          placeholder="Add a card..."
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCard()}
        />
        <button onClick={handleAddCard} className="btn-primary">+</button>
      </div>
    </div>
  )
}

export default Column
