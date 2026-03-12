import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exam from "./pages/Exam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exam />} />   {/* Default route */}
        <Route path="/exam" element={<Exam />} /> {/* Optional */}
      </Routes>
    </Router>
  );
}

export default App;