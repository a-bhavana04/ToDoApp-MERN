import { useState, useEffect } from "react";
import './App.css'
export default function App() {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState("Cheesecake");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    getMeals();
  }, []);

  async function getMeals() {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal
      );
      const data = await res.json();
      setMeals(data.meals);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMeals();
  }

  async function saveRecipe(recipe) {
    try {
      const res = await fetch("http://localhost:5000/api/save-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      if (res.ok) {
        console.log("Recipe saved successfully");

        getSavedRecipes();
      } else {
        console.error("Failed to save recipe");
      }
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  }

  async function getSavedRecipes() {
    try {
      const res = await fetch("http://localhost:5000/api/saved-recipes");
      const data = await res.json();
      console.log("Saved recipes:", data);
      
      setSavedRecipes(data);
    } catch (error) {
      console.error("Failed to fetch saved recipes:", error);
    }
  }
  const sortMeals = () => {
    const sortedMeals = [...meals].sort((a, b) =>
      sortOrder === "asc"
        ? a.strMeal.localeCompare(b.strMeal)
        : b.strMeal.localeCompare(a.strMeal)
    );
    setMeals(sortedMeals);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <center>
      <div className="max-width-800 w-100 p-4 rounded shadow" style={{ fontFamily: "Arial, sans-serif", background: "#fff" }}>
        <h1 className="text-center mb-4 p-3 bg-info text-dark rounded-top">Recipe Finder</h1>
  
        <form className="d-flex justify-content-center mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a food"
            required
            className="form-control me-2"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Search
          </button>
        </form>
        <div className="text-end mb-3">
          <button className="btn btn-success" onClick={sortMeals}>
            {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
          </button>
        </div>
        {meals ? (
          <div className="grid gap-3">
            {meals.map((meal) => (
              <article key={meal.idMeal} className="bg-warning rounded p-3 shadow">
                <h2 className="fw-bold mb-1">
                  {meal.strMeal}
                  <span className="badge bg-danger ms-2">{meal.strCategory}</span>{" "}
                  <span className="badge bg-info">{meal.strArea}</span>
                </h2>
  
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="img-fluid rounded mb-3" style={{'width':'300px'}}
                />
  
                <h3 className="fw-bold mb-1">Ingredients</h3>
                <ul className="list-unstyled mb-3">
                  {[...Array(20)].map((_, i) => (
                    meal[`strIngredient${i + 1}`] && (
                      <li key={i} className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">{meal[`strMeasure${i + 1}`]}</span>
                        <span>{meal[`strIngredient${i + 1}`]}</span>
                      </li>
                    )
                  ))}
                </ul>
  
                <h3 className="fw-bold mb-1">Instructions</h3>
                <p className="mb-3">{meal.strInstructions}</p>
  
                <ul className="d-flex gap-1">
                  {meal.strYoutube && (
                    <li>
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-danger"
                      >
                        Video
                      </a>
                    </li>
                  )}
                  {meal.strSource && (
                    <li>
                      <a
                        href={meal.strSource}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary"
                      >
                        Source
                      </a>
                    </li>
                  )}
  
                  <li>
                    <button
                      onClick={() => saveRecipe(meal)}
                      className="btn btn-success"
                    >
                      Save
                    </button>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-dark fw-bold mt-4">Sorry, we couldn't search for {meal}</h2>
        )}
  
        <div className="text-center mt-4">
          <button
            onClick={getSavedRecipes}
            className="btn btn-info"
          >
            View Saved Recipes
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-center mb-3 fw-bold">Saved Recipes</h2>
          {savedRecipes.length > 0 && (
            <div className="grid gap-3">
              {savedRecipes.map((recipe) => (
                <article key={recipe.idMeal} className="bg-white rounded p-3 shadow">
                  <h2 className="fw-bold mb-1">
                    {recipe.strMeal}
                    <span className="badge bg-danger ms-2">{recipe.strCategory}</span>{" "}
                    <span className="badge bg-info">{recipe.strArea}</span>
                  </h2>
  
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="img-fluid rounded mb-3"
                  />
  
                  <h3 className="fw-bold mb-1">Ingredients</h3>
                  <ul className="list-unstyled mb-3">
                    {[...Array(20)].map((_, i) => (
                      recipe[`strIngredient${i + 1}`] && (
                        <li key={i} className="d-flex align-items-center mb-1">
                          <span className="fw-bold me-2">{recipe[`strMeasure${i + 1}`]}</span>
                          <span>{recipe[`strIngredient${i + 1}`]}</span>
                        </li>
                      )
                    ))}
                  </ul>
  
                  <h3 className="fw-bold mb-1">Instructions</h3>
                  <p className="mb-3">{recipe.strInstructions}</p>
  
                  <ul className="d-flex gap-1">
                    {recipe.strYoutube && (
                      <li>
                        <a
                          href={recipe.strYoutube}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-danger"
                        >
                          Video
                        </a>
                      </li>
                    )}
                    {recipe.strSource && (
                      <li>
                        <a
                          href={recipe.strSource}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-info"
                        >
                          Source
                        </a>
                      </li>
                    )}
  
                    <li>
                      <button
                        onClick={() => saveRecipe(recipe)}
                        className="btn btn-light"
                      >
                        Save
                      </button>
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          )}
          {savedRecipes.length === 0 && <p className="text-center">No saved recipes found</p>}
        </div>
      </div>
      </center>
    </div>
  );
  
}
