import React from 'react';
import './style/button.css';

const CloseButton = (props) => {


    

    return (
        <div>
            <button id="cls-btn" className="ClsButton" onClick={props.onclick} >{props.content}</button>
        </div>
        

    
    )

}

export default CloseButton;