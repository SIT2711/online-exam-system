import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exam from "./pages/Exam";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Exam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;