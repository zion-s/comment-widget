import React, { useState } from "react";
import { DeleteButton, EditButton, ReplyButton } from "../Button/Button";
import Input from "../Input/Input";
import "./style.css";

const Comment = ({ id, name, children, deleteComment, modifyThread }) => {
  const [inputField, setInputField] = useState("");

  const clearField = () => {
    setInputField("");
  };

  return (
    <div className="comment">
      {!(inputField === "edit") ? (
        <>
          <span>{name}</span>
          <DeleteButton type="delete" onClick={() => deleteComment(id)}>
            Delete
          </DeleteButton>
          <ReplyButton type="reply" onClick={() => setInputField("reply")}>
            Reply
          </ReplyButton>
          <EditButton type="edit" onClick={() => setInputField("edit")}>
            Edit
          </EditButton>
        </>
      ) : (
        <Input
          edit
          id={id}
          clearField={clearField}
          modifyThread={modifyThread}
          value={name}
        />
      )}
      <div className="node">
        {inputField === "reply" ? (
          <Input
            reply
            id={id}
            clearField={clearField}
            modifyThread={modifyThread}
          />
        ) : null}
        {children &&
          children.map((child) => (
            <Comment
              key={child.id}
              id={child.id}
              name={child.name}
              children={child.children}
              deleteComment={deleteComment}
              modifyThread={modifyThread}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
