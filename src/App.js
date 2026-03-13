import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Exam from "./pages/Exam";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <Router>
      <div style={{ background: "#F8F9FA", minHeight: "100vh", padding: "20px" }}>
        <Routes>
          {/* Render the actual LoginForm component here */}
          <Route path="/login" element={<LoginForm />} />  
          <Route path="/Exam" element={<Exam />} />  
          <Route path="/AddQuestion" element={<AddQuestion />} />  
          
          {/* Optional: Add a default route */}
          <Route path="/" element={<h1>Welcome to Online Exam System</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
