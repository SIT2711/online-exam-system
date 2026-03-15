import React from "react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>25</h2>
            <p>Total Exams</p>
          </div>

          <div className="dashboard-card">
            <h2>120</h2>
            <p>Total Students</p>
          </div>

          <div className="dashboard-card">
            <h2>15</h2>
            <p>Total Teachers</p>
          </div>

          <div className="dashboard-card">
            <h2>320</h2>
            <p>Total Questions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;