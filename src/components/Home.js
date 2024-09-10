import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToDo } from "../utils/ToDoUtils";
import { useToDo } from "../hooks/useToDo";
import { TODO_API } from "../url";
import axios from "axios";

export const Home = (props) => {
  const [toDo, setToDo] = useState({ title: "", completed: false });
  const { toDoData, setToDoData } = useToDo();

  const setToDoItem = (todoTitle) => {
    setToDo({ title: todoTitle, completed: false });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!toDo.title) return; // Prevent adding empty tasks

    try {
      const todoResponse = await addToDo(toDo);
      setToDoData((prevData) => [...prevData, todoResponse]);
      setToDo({ title: "", completed: false }); // Clear input after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${TODO_API}/${id}`);
      setToDoData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkComplete = async (id) => {
    const selectedToDo = toDoData.find((item) => item.id === id);

    if (selectedToDo) {
      try {
        await axios.put(`${TODO_API}/${id}`, { ...selectedToDo, completed: true });
        setToDoData((prevData) =>
          prevData.map((data) => (data.id === id ? { ...data, completed: true } : data))
        );
      } catch (error) {
        console.error("Error marking task as complete:", error);
      }
    }
  };

  return (
  

      <div style={styles.container}>
      <h3 style={styles.header}>Welcome!! Add a new ToDo to the list</h3>
      <form onSubmit={handleAdd} className="add-task-form">
        <input
          type="text"
          value={toDo.title}
          onChange={(e) => setToDoItem(e.target.value)}
          placeholder="What's on your mind"
        />
        <button type="submit">Add To List</button>
      </form>

      <ol style={styles.toDoList}>
        {toDoData.map((toDoDataItem) => (
          <li key={toDoDataItem.id} style={styles.todoItem}>
            <span style={toDoDataItem.completed ? styles.completed : {}}>
              {toDoDataItem.title}
            </span>
            <div className="todo-item-buttons">
              {!toDoDataItem.completed ? (
                <button
                  onClick={() => handleMarkComplete(toDoDataItem.id)}
                  className="complete-button"
                >
                  Complete
                </button>
              ) : (
                <button
                  onClick={() => handleDelete(toDoDataItem.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  completed: {
    color: "green",
  },
  toDoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default Home;
