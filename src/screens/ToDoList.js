import React, { useEffect, useState } from 'react';
import { useToDo } from "../hooks/useToDo";

export const ToDoList = () => {
  const { toDoData } = useToDo();
  const [currentList, setCurrentList] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    filterData();
  }, [filterBy, toDoData]);

  const filterData = () => {
    let newData = [...toDoData];

    // Filter and Sort
    switch (filterBy) {
      case "active":
        newData = newData.filter(item => !item.completed);
        break;
      case "completed":
        newData = newData.filter(item => item.completed);
        break;
      case "old-first":
        newData = newData.sort((a, b) => a.id - b.id);
        break;
      case "new-first":
        newData = newData.sort((a, b) => b.id - a.id);
        break;
      case "name":
        newData = newData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    // Update state with the new filtered and/or sorted list
    setCurrentList(newData);
  };

  const handleFilterClick = (filter) => {
    setFilterBy(filter);
  };

  return (
    <>
      <div style={styles.buttonContainer}>
        <button
          style={filterBy === "active" ? styles.activeButton : styles.button}
          onClick={() => handleFilterClick("active")}
        >
          Show Active
        </button>
        <button
          style={filterBy === "completed" ? styles.activeButton : styles.button}
          onClick={() => handleFilterClick("completed")}
        >
          Show Completed
        </button>
        <button
          style={filterBy === "name" ? styles.activeButton : styles.button}
          onClick={() => handleFilterClick("name")}
        >
          Sort Alphabetically
        </button>
        <button
          style={filterBy === "old-first" ? styles.activeButton : styles.button}
          onClick={() => handleFilterClick("old-first")}
        >
          Show Oldest First
        </button>
        <button
          style={filterBy === "new-first" ? styles.activeButton : styles.button}
          onClick={() => handleFilterClick("new-first")}
        >
          Show Newest First
        </button>
        <div style={styles.count}>Total: {currentList.length}</div>
      </div>
      <div style={styles.listContainer}>
        {currentList.length > 0 ? (
          currentList.map((item) => (
            <div key={item.id} style={styles.item}>
              {item.title}
            </div>
          ))
        ) : (
          <p style={styles.noToDos}>No to-dos available</p>
        )}
      </div>
    </>
  );
};

const styles = {
  listContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    margin: "10px 0",
    maxWidth: "800px",
    margin: "0 auto",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  activeButton: {
    padding: "10px 20px",
    margin: "5px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  count: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  noToDos: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
};
