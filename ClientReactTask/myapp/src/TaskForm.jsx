import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    isCompleted: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    // Perform any validation checks if necessary before adding the task
    // For example, check if task name is not empty, due date is valid, etc.

    // Send a POST request to add the task to the API
    axios
      .post("http://127.0.0.1:8000/api/tasks", task)
      .then((response) => {
        // Notify the parent component about the newly added task
        onTaskAdded(response.data);

        // Show success message
        setSuccessMessage("Task added successfully!");

        // Reset the form fields after a brief delay
        setTimeout(() => {
          setTask({
            name: "",
            description: "",
            dueDate: "",
            isCompleted: false,
          });
          setSuccessMessage("");
        }, 2000); // Reset the form fields and success message after 2 seconds

        // Refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Name"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={(e) => setTask({ ...task, isCompleted: e.target.checked })}
        />
      </label>
      <button onClick={handleSubmit}>Add Task</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default TaskForm;
