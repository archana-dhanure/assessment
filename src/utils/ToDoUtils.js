import React from "react";
import axios from "axios";
import { TODO_API } from "../url";


export const addToDo = async (newTask) => {
  
  try {
    const response = await axios.post(TODO_API, newTask);

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }

  return;
};

export const prepareToDoPieChartData = (toDoList) => {

  
}
