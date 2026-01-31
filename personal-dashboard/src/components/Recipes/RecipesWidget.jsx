import React, { useState, useEffect } from 'react';
import recipesData from '../../data/recipes.json';

function RecipesWidget() {
  const [dailyRecipes, setDailyRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes based on dietary constraints
    const forbidden = ['fish', 'onion', 'garlic', 'salmon', 'tuna', 'shallot', 'leek'];
    
    const filtered = recipesData.filter(recipe => {
      const ingredientsStr = recipe.ingredients.join(' ').toLowerCase();
      const nameStr = recipe.name.toLowerCase();
      
      return !forbidden.some(f => ingredientsStr.includes(f) || nameStr.includes(f));
    });

    // Pick 3 random recipes (or fewer if not enough)
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setDailyRecipes(shuffled.slice(0, 3));
  }, []);

  return (
    <section id="recipes">
      <h2>Daily Recipes</h2>
      <div id="recipes-list">
        {dailyRecipes.length === 0 ? (
          <p>No recipes found matching constraints.</p>
        ) : (
          dailyRecipes.map(recipe => (
            <div key={recipe.id} className="recipe">
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Steps:</strong></p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'decimal' }}>
                {recipe.steps.map((step, i) => (
                  <li key={i} style={{ padding: '4px 0', border: 'none' }}>{step}</li>
                ))}
              </ul>
              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '10px' }}>
                {recipe.nutrition}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecipesWidget;
