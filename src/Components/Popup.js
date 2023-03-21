import React from 'react'
import './Popup.css'



function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <img className='close_btn' onClick={props.exit} src={require("./images/backbtn.png")} alt="exit" />
            

          
            {props.children}
        </div>
    </div>
  ) : '';
}

export default Popup