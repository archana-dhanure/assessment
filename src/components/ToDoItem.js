// TaskItem.jsx
import React from 'react';

export const ToDoItem = ({ task, onDelete, onToggleComplete }) => (
  <li>
    <span 
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      onClick={() => onToggleComplete(task.id)}
    >
      {task.title}
    </span>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
);
