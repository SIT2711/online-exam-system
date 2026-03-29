import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import LoginForm from "./pages/LoginForm";
import Exam from "./pages/Exam";
import AddQuestion from "./pages/AddQuestion";
import ExamList from "./pages/ExamList";
import ExamPage from "./pages/ExamPage";
import Register from "./pages/Register";
import ResultHistory from "./pages/ResultHistory";
import Result from "./pages/Result";
import ExamTimer from "./pages/ExamTimer";
import SubmitExam from "./pages/SubmitExam";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Editprofile";

import "./styles/LoginForm.css"; import "./styles/ExamList.css"; import "./styles/Dashboard.css"; import "./styles/ExamPage.css"; import "./styles/Register.css"; import "./styles/ResultHistory.css"; import "./styles/Result.css"; import "./styles/SubmitExam.css"; import "./styles/Profile.css"; import "./styles/EditProfile.css";

function App() {
  return (
    <Router>
      <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
        <Routes>

          {/* Public */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout><AdminDashboard /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <Layout><TeacherDashboard /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><StudentDashboard /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Exams */}
          <Route
            path="/exams"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><ExamList /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><Exam /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attemptexam"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><ExamPage /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/timer"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><ExamTimer /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/submitexam"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><SubmitExam /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Add Question */}
          <Route
            path="/addquestion"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><AddQuestion /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Results */}
          <Route
            path="/resulthistory"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                <Layout><ResultHistory /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><Result /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/editprofile"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                <Layout><EditProfile /></Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;