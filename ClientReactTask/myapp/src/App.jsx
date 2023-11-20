import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskForm />} />
        <Route path="/list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
