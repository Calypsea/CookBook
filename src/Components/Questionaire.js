import React from "react";
import Media from "react-media";

import "./Questionaire.css";
import "./Main.css";

import MealType from "./MealType";
import Cuisine from "./Cuisine";
import Ingredients from "./Ingredients";
import Recipes from "./Recipes";

import mealtypes from "./quiz_data/mealtypes";
import cuisines from "./quiz_data/cuisines";

import LoadingSpinner from "./Spinner";

export default function Questionaire() {
  //state for keeping data safe and updated
  const [meals, setMeals] = React.useState(mealtypes);
  const [cuis, setCuis] = React.useState(cuisines);

  //allows toggling selection on diet and cuisine types
  //v if clicked, chosen prop turns 'true' so can be incorporated later v
  function dietValue(value, type) {
    type((prev) => {
      return prev.map((item) => {
        return value === item.value ? { ...item, chosen: !item.chosen } : item;
      });
    });
  }
  //v creates cuisine and diet elements by mapping over object arrays v
  let mealTypeElements = meals.map((item) => {
    return (
      <MealType
        key={item.name}
        name={item.name}
        url={item.image}
        choose={() => dietValue(item.value, setMeals)}
        chosen={item.chosen}
      />
    );
  });
  let cuisineElements = cuis.map((item) => {
    return (
      <Cuisine
        key={item.name}
        name={item.name}
        url={item.image}
        choose={() => dietValue(item.name, setCuis)}
        chosen={item.chosen}
      />
    );
  });

  //is called by the YES button answering about preferred ingredients
  //allows form page to render

  const [formRender, setFormRender] = React.useState(false);
  const [final, setFinal] = React.useState(false);

  function renderFormTrue() {
    setFormRender(true);
    setFinal(true);
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });

  }
  function renderFormFalse() {
    setFormRender(false);
    setFinal(true);
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });

  }

  function aaa()
  {
    window.scrollTo(0, 800);
  }

  const styleButton = {
    background: formRender && "#5F8868",
    color: formRender && "white",
  };
  //form data
  const [ingredientsData, setIngredientsData] = React.useState({
    first: "",
    second: "",
    third: "",
  });
  const { first, second, third } = ingredientsData;

  function handleChange(event) {
    setIngredientsData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  //final function call to contact api and get info back

  const [apiRecipes, setApiRecipes] = React.useState("");

  // this filters the data from states by which was chosen(clicked on) and
  //maps it into an array that contains values of those elements.
  //then i join the array into string that will later feed into an api call
  let typeOfMeals = meals
    .filter((item) => item.chosen === true)
    .map((item) => item.value)
    .join();
  let typeOfCuisine = cuis
    .filter((item) => item.chosen === true)
    .map((item) => item.value)
    .join();

  //
  const [renderRecipes, setRenderRecipes] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false); // tracking loading
  const [loadCount, setLoadCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(""); //catching errors

  function handleRequest() {
    setIsLoading(true); //start loading animation
    let key = "7bf0253399f2488f818693d6dc510629";
    let key2 = "2b81a9ca9d59453ca8cb7a51847d8c11";
    //keys from SpoonacularAPI
    let threeRecipes = [];
    //contact api using all data already collected
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=20&sort=random&includeIngredients=${first},${second},${third}&diet=${typeOfMeals}&cuisine=${typeOfCuisine}`
    )
      .then((res) => res.json())
      .then((data) => {
        //grab 3 meal ids from the data received and stringify them
        for (let i = 0; i < 3; i++) {
          threeRecipes.push(data.results[i].id);
        }
        let threeIds = threeRecipes.join();
        return threeIds;
      })
      .then((Ids) => {
        //use ids to fetch the recipes
        return fetch(
          `https://api.spoonacular.com/recipes/informationBulk?apiKey=${key2}&ids=${Ids}&includeNutrition=false`
        );
      })
      .then((res) => res.json())
      .then((data) => {
        //set recipe statewith received data, allow to render elements with this data
        setApiRecipes(data);
        setRenderRecipes(true);
        setIsLoading(false); //loading button stops
        setErrorMessage("");
        setLoadCount((prev) => prev + 1);
        window.scrollTo({
          top: 800,
          behavior: "smooth",
        });
      })
      .catch(() => {
        setErrorMessage(
          "Unable to fetch recipe data. Please choose a different combination."
        );
        setIsLoading(false);
        setRenderRecipes(false);
        

      });
    //only set render boolean to true AFTER the apirecipe state is filled with information.
  }

  let recipeElements = [];

  if (renderRecipes) {
    //check if code contacted api already
    let ingredientArray = [];
    for (let i = 0; i < 3; i++) {
      let arr = [];
      for (let j = 0; j < apiRecipes[i].extendedIngredients.length; j++) {
        arr.push(apiRecipes[i].extendedIngredients[j].original);
      }
      ingredientArray.push(arr);
      //this thing creates an array for each of the meal ingredients and later puts all arrays
      //into one.
      //
      recipeElements.push(
        <Recipes
          key={apiRecipes[i].id}
          name={apiRecipes[i].title}
          url={apiRecipes[i].image}
          description={apiRecipes[i].instructions}
          ingredients={ingredientArray[i]}
        />
      ); //if it did, push 3 recipe elements into an array and print it in line 170
    }
  }

  return (
    <div className="questionaire">
      <h1 className="questionaire_title questionaire_top">Questionaire</h1>
      <h1 className="questionaire_title">
        {" "}
        Please choose what type of restrictions do you have:{" "}
      </h1>
      <div className="MealType_choices">{mealTypeElements}</div>
      <p>If none, continue</p>
      <h1 className="questionaire_title"> Do you have preferred cuisines? </h1>
      <div className="MealType_choices">{cuisineElements}</div>
      <h1 className="questionaire_title">
        {" "}
        Do you have preferred ingredients?{" "}
      </h1>
      <div className="questionaire_buttons">
        <button
          className="main_button questionaire_button"
          onClick={renderFormTrue}
          style={styleButton}
        >
          Yes
        </button>
        <button
          className="main_button questionaire_button"
          onClick={renderFormFalse}
        >
          No
        </button>
      </div>
      {/*render only if clicked 'Yes' above ^*/}
      {formRender && <Ingredients onChange={handleChange} />}
      {errorMessage ? <div className="error">{errorMessage}</div> : ""}
      {isLoading && loadCount < 1 ? <LoadingSpinner /> : ""}
      {renderRecipes ? (
        <div className="recipe_output">
          <h2>Your options for today:</h2>

          <Media queries={{ small: { maxWidth: 768 } }}>
            {(matches) =>
              matches.small ? (
                <div className="recipes small">
                  {isLoading ? <LoadingSpinner /> : recipeElements}
                </div>
              ) : (
                <div className="recipes">
                  {isLoading ? <LoadingSpinner /> : recipeElements}
                </div>
              )
            }
          </Media>
        </div>
      ) : (
        <div className="recipe_output"></div>
      )}
      {final && (
        <div className="findRecipes">
          <button
            className="main_button findRecipes_button"
            onClick={handleRequest}
            disabled={isLoading}
          >
            {!renderRecipes ? `Find recipes!` : `Try again?`}
          </button>
          {renderRecipes && (
            <button
              className="main_button reload_button"
              onClick={() => window.location.reload(false)}
            >
              Restart the questionaire
            </button>
          )}
        </div>
      )}

      {final && (
        <div className="credits">
          <p>© Austėja Kazlauskaitė</p>
          <a href="https://github.com/Calypsea/CookBook">Github</a>
          <a href="https://www.linkedin.com/in/aust%C4%97ja-kazlauskait%C4%97-550368252/">
            LinkedIn
          </a>
          {/* <p>2023</p> */}
          <button onClick={aaa}>aaa</button>

        </div>
      )}
    </div>
  );
}
