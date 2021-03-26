import React from 'react';
import './style/button.css';

const Button = (props) => {
    return <button className="Button" onClick={props.onclick}>{props.content}</button>
}

export default Button;