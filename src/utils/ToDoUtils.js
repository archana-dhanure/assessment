import React from 'react';
import axios from 'axios';
import {TODO_API} from "../url";


const TaskFilter = ({ filter, onFilterChange }) => (
  <div>
    <button onClick={() => onFilterChange('all')}>All</button>
    <button onClick={() => onFilterChange('completed')}>Completed</button>
    <button onClick={() => onFilterChange('incomplete')}>Incomplete</button>
  </div>
);


export const sortTasks = (tasks, sortBy) => {
    return tasks.slice().sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Sort by creation date
      return new Date(a.creationDate) - new Date(b.creationDate);
    });
  };


  export const addToDo = async (newTask) => {
    //event.preventDefault();

    console.log("inside util --->", newTask)
    //return

    try {
     
      // const newTask = { title: newTaskTitle, completed: false };
      const response = await axios.post(TODO_API, newTask);
     
      return response.data;
      // setTasks(prevTasks => [...prevTasks, response.data]);
      // setNewTaskTitle('');
    } catch (error) {

      console.error('Error adding task:', error);
    }


 return;

  };
