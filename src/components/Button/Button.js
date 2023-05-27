import React from "react";
import "./style.css";

const withButton = (Component) => {
  return function WithButton(props) {
    const { type, onClick, children } = props;

    return (
      <Component className={`btn-group ${type}-button`} onClick={onClick}>
        {children}
      </Component>
    );
  };
};

export const EditButton = withButton(({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
));

export const ReplyButton = withButton(({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
));

export const DeleteButton = withButton(({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
));
