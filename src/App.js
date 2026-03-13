import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import ExamList from "./pages/ExamList";
import './styles/LoginForm.css';
import './styles/ExamList.css';

function App() {
  return (
    <Router>
      <div style={{ background: "#F8F9FA", minHeight: "100vh", padding: "20px" }}>
        <Routes>
          {/* Render the actual LoginForm component here */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/exams" element={<ExamList/>}/> 
          
          {/* Optional: Add a default route */}
          <Route path="/" element={<h1>Welcome to Online Exam System</h1>} />
        </Routes>
      </div>
    </Router>
=======
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
>>>>>>> c471927e1bd3fc860546647eb9ff6017855c4dd2
  );
}

export default App;