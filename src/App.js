import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import Register from "./pages/Register";
//import Dashboard from "./pages/Dashboard";
//import Exam from "./pages/Exam";
// import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <Router>
      <div style={{ background: "#F8F9FA", minHeight: "100vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<div>Register</div> } />
          <Route path="/dashboard" element={<div>Register</div>} />
          <Route path="/exam" element={<div>Register</div>} />
          <Route path="/add-question" element={<div>Register</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;