import React from 'react';
import './style/button.css';

const CloseButton = (props) => {
    return <button className="ClsButton" onClick={props.onclick}>{props.content}</button>
}

export default CloseButton;