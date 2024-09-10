// useTasks.js
import { useState, useEffect } from 'react';
import { TODO_API } from "../url";

export const useToDo = () => {
  const [toDoData, setToDoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(TODO_API);
        const data = await response.json();

      
      //  const activeToDo  =  data.filter(toDoItem => !toDoItem.completed )
       setToDoData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { toDoData, loading, error,setToDoData };
};
