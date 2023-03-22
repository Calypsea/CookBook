import React from 'react'
import Media from 'react-media';
import './Popup.css'



function Popup(props) {

  let ingredientElements = props.ingredients.map(item => {
    return(
      <li>{item}</li>
    )
  })
  return (props.trigger) ? (
    // <div className="popup">
    //     <div className="popup-inner">
    //         <img className='close_btn' onClick={props.exit} src={require("./images/backbtn.png")} alt="exit" />
    //         {props.children}
    //         <h3>Ingredients:</h3>
    //         {ingredientElements}
    //         <h3>Recipe:</h3>
    //         <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" />
          
            
    //     </div>
    // </div>
    <Media queries={{ small: { maxWidth: 768 } }}>
      {matches =>
          matches.small ? (
            <div className="popup pop_small">
              <div className="popup-inner">
                  <img className='close_btn' onClick={props.exit} src={require("./images/backbtn.png")} alt="exit" />
                  {props.children}
                  <h3>Ingredients:</h3>
                  {ingredientElements}
                  <h3>Recipe:</h3>
                  <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" />
                
                    
                </div>
            </div>
          ) : (
            <div className="popup">
            <div className="popup-inner">
                <img className='close_btn' onClick={props.exit} src={require("./images/backbtn.png")} alt="exit" />
                {props.children}
                <h3>Ingredients:</h3>
                {ingredientElements}
                <h3>Recipe:</h3>
                <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" />
              
                  
              </div>
            </div>
          )
      }
    </Media>
  ) : '';

}

export default Popup