import Popup from "./Popup"
import React from 'react'

export default function Recipes(props){

    const [trigger, setTrigger] = React.useState(false);

    function triggerFunction(){
        setTrigger(prev => !prev);
    }
    
    return(
        <div className="recipe">
            <img src={props.url} alt={props.name} className="recipe_img"/>
            <h2 className="recipe_title">{props.name}</h2>
            
            {/* //grab ingredients somehow from the damn api and display those with ^^ */}
            <button className="main_button recipe_button" onClick={triggerFunction}>Show recipe</button>
            <Popup 
                trigger={trigger}
                exit={triggerFunction}
                description={props.description}
            >
                <h2>{props.name}</h2>
                <h3>Recipe:</h3>
            </Popup>
        </div>
    )
}