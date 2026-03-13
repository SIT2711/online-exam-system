import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddQuestion from "./pages/AddQuestion";
import "./App.css";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddQuestion />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;