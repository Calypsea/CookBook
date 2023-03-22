import React from 'react'
import './Popup.css'



function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <img className='close_btn' onClick={props.exit} src={require("./images/backbtn.png")} alt="exit" />
            {props.children}
            <div dangerouslySetInnerHTML={{ __html: props.description }} className="recipe_instructions" />
            <h3>Ingredients:</h3>
          
            
        </div>
    </div>
  ) : '';

}

export default Popup