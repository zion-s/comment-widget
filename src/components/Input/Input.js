import React, { useState } from "react";
import "./style.css";

const Input = ({ modifyThread, reply, edit, id, value, clearField }) => {
  const [text, setText] = useState(value || "");
  const setComment = () => {
    if (modifyThread) modifyThread(text, edit ? "edit" : "reply", id);
    setText("");
    clearField && clearField();
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={reply || edit ? "secondary-input" : "main-input"}
      />
      <button
        onClick={setComment}
        className={reply || edit ? "blue-button-secondary" : "blue-button"}
      >
        {reply || edit ? "Add" : "Add Comment"}
      </button>
    </>
  );
};

export default Input;
