import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const toggleTask = (id) => {
    axios
      .patch(`http://127.0.0.1:8000/api/tasks/${id}`, { completed: true })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEdit = (task) => {
    setEditedTask(task);
  };

  const handleUpdate = (id, updatedTask) => {
    axios
      .patch(`http://127.0.0.1:8000/api/tasks/${id}`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );
        setEditedTask(null);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.name}</span>
            <span>{task.description}</span>
            <span>{task.dueDate}</span>
            <span>{task.completed ? "True" : "False"}</span>{" "}
            {/* Display isCompleted property */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editedTask && (
        <div>
          <input
            type="text"
            placeholder="New Task Name"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="New Description"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="New Due Date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={editedTask.completed}
              onChange={(e) =>
                setEditedTask({ ...editedTask, completed: e.target.checked })
              }
            />
          </label>
          <button onClick={() => handleUpdate(editedTask.id, editedTask)}>
            Update Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
