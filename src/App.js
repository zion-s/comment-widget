import { useEffect, useState } from "react";
import Comment from "./components/Comment/Comment";
import Input from "./components/Input/Input";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export default function App() {
  const [thread, setThread] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("thread");
    if (data) setThread(JSON.parse(data));
  }, []);

  function checkAndSetValue(arr, name, type = "reply", id = null) {
    if (!Array.isArray(arr)) {
      return arr;
    }

    let updated = false;
    const newArr = arr.map((obj) => {
      if (obj.id === id) {
        if (type === "edit") {
          obj = { ...obj, name };
        } else if (type === "reply") {
          obj.children.push({ id: uuidv4(), name, children: [] });
        }
        updated = true;
      } else if (id !== null) {
        obj.children = checkAndSetValue(obj.children || [], name, type, id);
      }
      return obj;
    });

    if (!updated && !id && type === "reply") {
      let newId = uuidv4();
      if (newArr.length > 0) {
        newId = uuidv4();
        while (newArr.find((obj) => obj.id === newId)) {
          newId = uuidv4();
        }
      }
      newArr.push({ id: newId, name, children: [] });
    }

    return newArr;
  }

  const deleteObjectById = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.id === id) {
        arr.splice(i, 1);
        return arr;
      }
      if (obj.children && obj.children.length > 0) {
        obj.children = deleteObjectById(obj.children, id);
      }
    }
    return arr;
  };

  const modifyThread = (msgText, action, id) => {
    if (msgText.length > 0 && msgText.trim() !== "") {
      const newThread = checkAndSetValue([...thread], msgText, action, id);
      setThread(newThread);
      localStorage.setItem("thread", JSON.stringify(newThread));
    }
  };

  const deleteComment = (id) => {
    const newThread = deleteObjectById([...thread], id);
    setThread(newThread);
    localStorage.setItem("thread", JSON.stringify(newThread));
  };

  return (
    <div className="App">
      <h2 className="title">Comment Widget</h2>
      <Input modifyThread={modifyThread} />
      {thread.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          name={comment.name}
          children={thread.find((obj) => obj.id === comment.id)?.children}
          deleteComment={deleteComment}
          modifyThread={modifyThread}
        />
      ))}
    </div>
  );
}
