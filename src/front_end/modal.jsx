import React, { useState } from "react";
import Button from "./button.jsx";
import "./style/modal.css";

const Modal = (props) => {
  let data = [];
  let content;
  //let [content, changeContent] = useState(null);

  let initialState = props.state;
  let [state, changeState] = useState(true);

  console.log("Initial State: " + initialState);

  const closeState = () => {
    changeState(false);
  }

  if (props.state === false) {
    content = null;
  } else {
    for (let i = 0; i < props.content.length; i++) {
      data[i] = props.content[i];
    }

     content = (

        <div>
          <div className="Title">
            <h2>Coming up next</h2>
          </div>
          <div>
            {
              data.map((deletedGuest) => (
                <div key={deletedGuest.uuid} className="Data-Wd">
                  <p>Name: {deletedGuest.name} ----- Priority: {deletedGuest.priority}</p>
                </div>
              ))
            }
          </div>    
          
        </div>

      
    );
  }

  

  return <div>{(state === false) ? (content = null) : content}</div>;
};

export default Modal;