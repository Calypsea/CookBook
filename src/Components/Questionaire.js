import React from 'react';
import './Questionaire.css'
import './Main.css'

import MealType from './MealType';
import Cuisine from './Cuisine';
import Ingredients from './Ingredients';
import Recipes from './Recipes';

import mealtypes from './quiz_data/mealtypes'
import cuisines from './quiz_data/cuisines'


export default function Questionaire(){

    

    //state for keeping data safe and updated
    const [meals, setMeals] = React.useState(mealtypes);
    const [cuis, setCuis] = React.useState(cuisines);
    
    //allows toggling selection on diet and cuisine types
    //v if clicked, chosen prop turns 'true' so can be incorporated later v
    function dietValue(value, type)
    {
        // let diet = `diet=${value}`;
        type(prev =>{
           return prev.map(item => {
            return value === item.value ? {...item, chosen: !item.chosen} : item
           })
        });
    }
    //v creates cuisine and diet elements by mapping over object arrays v
    //try to put in one maybe?
    let MealTypeElements = meals.map(item => {
        return(
            <MealType
                key={item.name}
                name={item.name}
                url={item.image}
                choose={() => dietValue(item.value, setMeals)}
                chosen={item.chosen}
            />
        )
    });
    let cuisineElements = cuis.map(item => {
        return(
            <Cuisine
                key={item.name}
                name={item.name}
                url={item.image}
                choose={() => dietValue(item.name, setCuis)}
                chosen={item.chosen}
            />
        )
    });
    
    //is called by the YES button answering about preferred ingredients
    //allows form page to render

    const [formRender, setFormRender] = React.useState(false);
    const [final, setFinal] = React.useState(false);
    
    function renderFormTrue(){ 
        setFormRender(true);
        setFinal(true);
    }
    function renderFormFalse(){ 
        setFormRender(false);
        setFinal(true);
    }
    //form data
    const [ingredientsData, setIngredientsData] = React.useState({
        first: "",
        second: "",
        third: ""
    })
    const {first,second,third} = ingredientsData;

    function handleChange(event){ 
        setIngredientsData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    //final function call to contact api and get info back
   
    
    
    const [apiRecipes, setApiRecipes] = React.useState('');

    // this filters the data from states by which was chosen(clicked on) and 
    //maps it into an array that contains values of those elements.
    //then i join the array into string that will later feed into an api call
    let typeOfMeals = meals.filter(item => item.chosen === true).map(item => item.value).join();
    let typeOfCuisine = cuis.filter(item => item.chosen === true).map(item => item.value).join();
    //!!figure out how to grab data from forms in nice format
    
    const [renderRecipes, setRenderRecipes] = React.useState(false);
    
    function handleRequest(){ 
        
        let key = "7bf0253399f2488f818693d6dc510629";
        let key2 = "2b81a9ca9d59453ca8cb7a51847d8c11";
        //keys from SpoonacularAPI
        let threeRecipes = [];
        //contact api using all data already collected
         fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=20&sort=random&includeIngredients=${first},${second},${third}&diet=${typeOfMeals}&cuisine=${typeOfCuisine}`)
         .then( res => res.json())
         .then(data => {
            
            //grab 3 meal ids from the data received and strigify them
            for(let i = 0; i < 3; i++) 
            {
                threeRecipes.push(data.results[i].id);
            }
            let threeIds = threeRecipes.join();
            return threeIds;
        })
        .then(Ids => { //use ids to fetch the recipes
            return fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${key2}&ids=${Ids}&includeNutrition=false`)
        })
        .then(res => res.json())
        .then(data => {
            setApiRecipes(data)
            setRenderRecipes(true)
            
        })
        //only set render boolean to true AFTER the apirecipe state is filled with information.  
    }

    let recipeElements = [];
    if(renderRecipes) //check if code contacted api already
    {
        console.log(apiRecipes[0].instructions)
        for(let i = 0; i < 3; i++)
        {
            recipeElements.push(<Recipes
                key={apiRecipes[i].id} 
                name={apiRecipes[i].title} 
                url={apiRecipes[i].image}
                description={apiRecipes[i].instructions} 
        />) //if it did, push 3 recipe elements into an array and print it in line 170
        }
    }
    return(
        <div className="questionaire">
             <h1 className="questionaire_title questionaire_top">Your preferences:</h1>
            <h1 className="questionaire_title"> Please choose what type of restrictions do you have:  </h1>
            <div className="MealType_choices">
                {MealTypeElements}
            </div>
            <p>If none, continue</p>
            <h1 className="questionaire_title"> Do you have preferred cuisines?  </h1>
            <div className="MealType_choices">
                {cuisineElements}
            </div>
            <h1 className="questionaire_title"> Do you have preferred ingredients?  </h1>
            <div className="questionaire_buttons">
                <button className="main_button questionaire_button" onClick={renderFormTrue}>Yes</button>
                <button className="main_button questionaire_button"onClick={renderFormFalse}>No</button>
            </div>
            {/*render only if clicked 'Yes' above ^*/}
            {formRender && <Ingredients onChange={handleChange}/>}
            {final && <div className="findRecipes">
                <button className='main_button findRecipes_button' onClick={handleRequest}>{!renderRecipes ? `Find recipes!` : `Try again?`}</button>
            </div>}
            {renderRecipes && <div className="recipe_output">
                <h2>Your options for today:</h2>
                <div className="recipes">
                    {recipeElements}
                </div>
            </div>}
           

        </div>
    )
}