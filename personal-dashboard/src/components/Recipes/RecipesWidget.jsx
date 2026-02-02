import { useState, useEffect } from 'react'
import recipesData from '../../data/recipes.json'

// RecipesWidget component - displays 3 daily recipes (no fish, onion, garlic)
function RecipesWidget() {
  const [recipes, setRecipes] = useState([])
  const [expandedRecipe, setExpandedRecipe] = useState(null)

  useEffect(() => {
    // Load recipes and filter for dietary constraints
    const filteredRecipes = recipesData.filter(recipe => {
      const ingredientsText = recipe.ingredients.join(' ').toLowerCase()
      // Exclude recipes with fish, onion, or garlic
      return !ingredientsText.includes('fish') && 
             !ingredientsText.includes('onion') && 
             !ingredientsText.includes('garlic')
    })
    
    // Show 3 recipes (all available in our sample data)
    setRecipes(filteredRecipes.slice(0, 3))
  }, [])

  const toggleRecipe = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId)
  }

  return (
    <div className="recipes-container">
      <h2>Daily Recipes</h2>
      <p className="subtitle">
        3 healthy recipes per day - No fish, onion, or garlic
      </p>

      <div className="recipes-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div 
              className="recipe-header"
              onClick={() => toggleRecipe(recipe.id)}
            >
              <h3>{recipe.name}</h3>
              <button className="btn-expand">
                {expandedRecipe === recipe.id ? '−' : '+'}
              </button>
            </div>

            {expandedRecipe === recipe.id && (
              <div className="recipe-details">
                <div className="recipe-section">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <h4>Steps:</h4>
                  <ol>
                    {recipe.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="recipe-meta">
                  <p className="recipe-note">{recipe.note}</p>
                  <p className="recipe-nutrition">{recipe.nutrition}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="dietary-info">
        <h4>Dietary Constraints:</h4>
        <ul>
          <li>No fish or seafood</li>
          <li>No onion</li>
          <li>No garlic</li>
        </ul>
      </div>
    </div>
  )
}

export default RecipesWidget
