import React, { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [editRecipeId, setEditRecipeId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editRecipeId !== null) {
      const updatedRecipes = [...recipes];
      const index = updatedRecipes.findIndex((recipe) => recipe.id === editRecipeId);
      updatedRecipes[index] = {
        id: editRecipeId,
        title: title,
        description: description,
        ingredients: ingredients.split(',').map((item) => item.trim()),
      };
      setRecipes(updatedRecipes);
      setEditRecipeId(null);
    } else {
      setRecipes([
        ...recipes,
        {
          id: recipes.length + 1,
          title: title,
          description: description,
          ingredients: ingredients.split(',').map((item) => item.trim()),
        },
      ]);
    }
    setTitle('');
    setDescription('');
    setIngredients('');
  };

  const handleEdit = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients.join(', '));
    setEditRecipeId(id);
  };

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <h1>Mon livre de recettes</h1>
      <h2>{editRecipeId !== null ? 'Modifier une recette' : 'Ajouter une recette'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="ingredients">Ingrédients:</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          />
        <button type="submit">{editRecipeId !== null ? 'Modifier' : 'Ajouter'}</button>
        {editRecipeId !== null && (
          <button type="button" onClick={() => setEditRecipeId(null)}>Annuler</button>
        )}
      </form>
      <h2>Liste des recettes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <h3>Ingrédients nécéssaires</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <button onClick={() => handleEdit(recipe.id)}>Modifier</button>
          <button onClick={() => handleDelete(recipe.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default App;