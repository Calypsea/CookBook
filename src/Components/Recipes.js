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
            {/* <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" /> */}
            {/* //grab ingredients somehow from the damn api and display those with ^^ */}
            <button className="main_button recipe_button" onClick={triggerFunction}>Show recipe</button>
            <Popup 
                trigger={trigger}
                exit={triggerFunction}
            >
                <h2>Pop up works</h2>
            </Popup>
        </div>
    )
}