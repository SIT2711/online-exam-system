import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Layout + Security */
import Layout from "./components/Layout";
import ProtectedRoute from "./ProtectedRoute";

/* Dashboards */
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

/* Auth */
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";

/* Exam */
import Exam from "./pages/Exam";
import ExamList from "./pages/ExamList";
import AttemptExam from "./pages/AttemptExam";
import AddQuestion from "./pages/AddQuestion";

/* Exam Management */
import ViewExam from "./pages/ViewExam";
import EditExam from "./pages/EditExam";
import EditQuestion from "./pages/EditQuestion";

/* Result */
import ResultHistory from "./pages/ResultHistory";
import Result from "./pages/Result";
import SubmitExam from "./pages/SubmitExam";

/* Profile */
import Profile from "./pages/Profile";
import EditProfile from "./pages/Editprofile";

/* Timer */
import ExamTimer from "./pages/ExamTimer";

/* CSS */
import "./styles/LoginForm.css";
import "./styles/ExamList.css";
import "./styles/Dashboard.css";
import "./styles/ExamPage.css";
import "./styles/Register.css";
import "./styles/ResultHistory.css";
import "./styles/Result.css";
import "./styles/SubmitExam.css";
import "./styles/Profile.css";
import "./styles/EditProfile.css";
import "./styles/EditExam.css";
import "./styles/ViewExam.css";
import "./styles/EditQuestion.css";

function App() {
  return (
    <Router>
      <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />

          {/* ================= DASHBOARDS ================= */}
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

          {/* ================= EXAMS ================= */}
          <Route
            path="/exams"
            element={
              <ProtectedRoute allowedRoles={["student", "teacher"]}>
                <Layout><ExamList /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><Exam /></Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= VIEW / EDIT ================= */}
          <Route
            path="/viewExam/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><ViewExam /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-exam/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><EditExam /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-question/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><EditQuestion /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/addquestion"
            element={
              <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                <Layout><AddQuestion /></Layout>
              </ProtectedRoute>
            }
          />

          {/* ================= STUDENT EXAM FLOW ================= */}
          <Route
            path="/attemptexam/:exam_id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Layout><AttemptExam /></Layout>
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

          {/* ================= RESULTS ================= */}
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

          {/* ================= PROFILE ================= */}
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