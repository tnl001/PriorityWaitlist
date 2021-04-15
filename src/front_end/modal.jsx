import React, { useState } from "react";
import "./style/modal.css";

const Modal = (props) => {
  let data = [];
  let content;

  /**
   * This function sets style for data card upon getting clicked
   * @param index 
   */
  const disableDiv = (index) => {
    document.getElementById(index).style.backgroundColor='green';
    document.getElementById(index).style.color='white';
    document.getElementById(index).style.opacity=0.3;
    document.getElementById(index).style.pointerEvents='none';

    console.log("count: " + document.getElementById('clear-count').textContent);
    console.log("modal length: " + props.content.length);

    let count = parseInt(document.getElementById('clear-count').textContent);
    let threshold = props.content.length;

    // If all items are cleared, then unlock the 'done' button
    if (count === threshold) {
      document.getElementById('cls-btn').style.opacity = 1;
      document.getElementById('cls-btn').style.pointerEvents = "auto";
      console.log('cleared');
    }
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
              // the map function can also map the index of the current element, so very convenient!!
              data.map((deletedGuest, i) => (
                <div id={i} key={deletedGuest.uuid} className="Data-Wd" onClick={() => {props.clearDetect(); disableDiv(i);}} >
                  <p>Ind: {i} ----- Name: {deletedGuest.name} ----- Priority: {deletedGuest.priority}</p>
                </div>
              ))
            }

          </div>  
        </div>
    );
  }

  return <div>{content}</div>
};

export default Modal;