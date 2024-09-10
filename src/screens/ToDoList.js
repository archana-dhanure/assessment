import React, { useEffect, useState } from 'react';
import { useToDo } from "../hooks/useToDo";
import { TODO_API } from "../url";

export const ToDoList = () => {
  const { toDoData } = useToDo(TODO_API);
  const [currentList, setCurrentList] = useState(toDoData);
  const [filterBy, setFilterBy] = useState("");
 

  useEffect(() => {
    filterData();
  }, [filterBy, toDoData]);

  const filterData = () => {
    let newData = [...toDoData];

    // Filter
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

  return (
    <>
      <div style={Styles.buttonContainer}>
        <button onClick={() => setFilterBy("active")}>Show Active</button>
        <button onClick={() => setFilterBy("completed")}>Show Completed</button>
        <button onClick={() => setFilterBy("name")}>Sort Alphabetically</button>
        <button onClick={() => setFilterBy("old-first")}>Show Oldest First</button>
        <button onClick={() => setFilterBy("new-first")}>Show Newest First</button>
        <div>{currentList?.length}</div>
      </div>
      <div>
        {currentList.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

const Styles = {
  buttonContainer: {
    display: "flex",
    width: "50vw",
    justifyContent: "space-between",
    marginRight: "10px",
  },
};
