import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddQuestion from "./pages/AddQuestion";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;