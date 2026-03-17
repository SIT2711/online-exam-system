import React from "react";
import "../../styles/Dashboard.css";
import Navbar from "../../components/Navbar";

function TeacherDashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Teacher Dashboard</h1>
        <p>Welcome! Manage your exams and questions here.</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>8</h2>
            <p>Created Exams</p>
          </div>

          <div className="dashboard-card">
            <h2>50</h2>
            <p>Questions Added</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;