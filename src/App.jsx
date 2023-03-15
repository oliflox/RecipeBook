import React, { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [editRecipeId, setEditRecipeId] = useState(null)
  

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editRecipeId !== null) {
      const updatedRecipes = [...recipes]
      const index = updatedRecipes.findIndex(
        (recipe) => recipe.id === editRecipeId,
      )
      updatedRecipes[index] = {
        id: editRecipeId,
        title: title,
        description: description,
        ingredients: ingredients.split(',').map((item) => item.trim()),
      }
      setRecipes(updatedRecipes)
      setEditRecipeId(null)
    } else {
      setRecipes([
        ...recipes,
        {
          id: recipes.length + 1,
          title: title,
          description: description,
          ingredients: ingredients.split(',').map((item) => item.trim()),
        },
      ])
    }
    setTitle('')
    setDescription('')
    setIngredients('')
  }

  const handleEdit = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    setTitle(recipe.title)
    setDescription(recipe.description)
    setIngredients(recipe.ingredients.join(', '))
    setEditRecipeId(id)
  }

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const handleAddToShoppingList = (recipe) => {
    const newIngredients = recipe.ingredients.filter(
      (ingredient) => !shoppingList.includes(ingredient)
    );
    setShoppingList([...shoppingList, ...newIngredients]);
  };
  

  return (
    <div>
      <h1>Mon livre de recettes</h1>
      <h2>Ajouter une recette</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="ingredients">Ingrédients:</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        </div>
        <div>
        <button type="submit">
          {editRecipeId !== null ? 'Modifier' : 'Ajouter'}
        </button>
        {editRecipeId !== null && (
          <button type="button" onClick={() => setEditRecipeId(null)}>
            Annuler
          </button>
        )}
        </div>
        
      </form>
      <h2>Liste des recettes</h2>
      {recipes.map((recipe) => (
        <div id='recipe' key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <h4>Ingrédients nécessaires</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div id='RecipeButton'>
          <button onClick={() => handleEdit(recipe.id)}>Modifier</button>
          <button onClick={() => handleDelete(recipe.id)}>Supprimer</button>
          <button onClick={() => handleAddToShoppingList(recipe)}>
            Ajouter à la liste de courses
          </button>
          </div>
          
        </div>
      ))}
      <h2>Liste de courses</h2>
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;