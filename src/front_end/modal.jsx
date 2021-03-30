import React from "react";
import "./style/modal.css";

const Modal = (props) => {
  let content;
  if (props.state === false) {
    content = null;
  } else {
    content = (
      <div className="Modal-Wd">
        <h1>This is a modal</h1>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Modal;