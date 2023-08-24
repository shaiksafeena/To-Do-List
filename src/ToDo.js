import React, { useState } from "react";
import "./ToDo.css";

const Todo = () => {
  const [message, setMessage] = useState({ text: "", id: "" });
  const [messageList, setMessageList] = useState([]);
  const [isediting, setIsediting] = useState({ editing: false });

  const handleAdd = (e) => {
    e.preventDefault();
    let newTodo = {
      text: message.text,
      id: message.id,
      done: false,
    };
    setMessageList([...messageList, newTodo]);
    setMessage({
      text: "",
      id: "",
    });
  };

  const handleDone = (id) => {
    setMessageList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleEdit = (editid) => {
    setIsediting({
      ...isediting,
      id: editid,
      editing: true,
    });
    let editmessage = messageList.find((eachmessage) => {
      return eachmessage.id === editid;
    });
    setMessage({
      ...message,
      text: editmessage.text,
      id: editmessage.id,
    });
  };

  const handleEditing = (e) => {
    e.preventDefault();
    let editingmessage = messageList.map((eachmessage) => {
      if (eachmessage.id === isediting.id) {
        return {
          text: message.text,
          id: message.id,
        };
      } else {
        return eachmessage;
      }
    });
    setMessageList(editingmessage);
    setMessage({
      text: "",
      id: "",
    });
    setIsediting({
      ...isediting,
      editing: false,
    });
  };

  const handleDelete = (commonid) => {
    let value = messageList.filter((eachvalue) => {
      return eachvalue.id !== commonid;
    });
    setMessageList(value);
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <form>
        <input
          type="text"
          value={message.id}
          onChange={(e) =>
            setMessage({
              ...message,
              id: e.target.value,
            })
          }
          placeholder="Enter the ID"
        ></input>
        <input
          type="text"
          value={message.text}
          onChange={(e) =>
            setMessage({
              ...message,
              text: e.target.value,
            })
          }
          placeholder="Enter the text"
        ></input>
        {isediting.editing ? (
          <button onClick={(e) => handleEditing(e)}>edit</button>
        ) : (
          <button onClick={(e) => handleAdd(e)}>Add</button>
        )}
      </form>
      <hr />
      <div>
        {messageList.length === 0 && <h4>The list is empty</h4>}
        <ul>
          {messageList.map((eachmessage, index) => {
            const { text, id, done } = eachmessage;
            return (
              <li key={index}>
                <span>{id}</span>
                <span className={done ? "done-text" : ""}>{text}</span>
                {done ? (
                  <button
                    className="done-button"
                    onClick={() => handleDone(id)}
                  >
                    un-done
                  </button>
                ) : (
                  <button
                    className="done-button"
                    onClick={() => handleDone(id)}
                  >
                    done
                  </button>
                )}
                <button className="edit-button" onClick={() => handleEdit(id)}>
                  edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(id)}
                >
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
