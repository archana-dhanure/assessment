// useTasks.js
import { useState, useEffect } from 'react';

export const useToDo = (apiUrl) => {
  const [toDoData, setToDoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(apiUrl);
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
  }, [apiUrl]);

  return { toDoData, loading, error,setToDoData };
};
