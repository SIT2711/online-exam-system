import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import Exam from "./pages/Exam";
import AddQuestion from "./pages/AddQuestion";
import ExamList from "./pages/ExamList";
import ExamPage from "./pages/ExamPage";
import Register from "./pages/Register";

import './styles/LoginForm.css';
import './styles/ExamList.css';
import './styles/Dashboard.css';
import './styles/ExamPage.css';
import './styles/Register.css';

function App() {
  return (
    <Router>
      <div style={{ background: "rgb(248,249,250)", minHeight: "100vh", padding: "20px" }}>
        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/addquestion" element={<AddQuestion />} />
           <Route path="/attemptexam" element={<ExamPage />} />
            <Route path="/register" element={<Register />} />

          <Route path="/" element={<h1>Welcome to Online Exam System</h1>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;