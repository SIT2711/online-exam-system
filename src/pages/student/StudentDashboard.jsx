import React from "react";
import "../../styles/Dashboard.css";

function StudentDashboard() {
  return (
  
      <div className="dashboard-container">
        <h1 className="dashboard-title">Student Dashboard</h1>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>5</h2>
            <p>Upcoming Exams</p>
          </div>

          <div className="dashboard-card">
            <h2>12</h2>
            <p>Completed Exams</p>
          </div>

          <div className="dashboard-card">
            <h2>9</h2>
            <p>Results Published</p>
          </div>
        </div>
      </div>
  );
}

export default StudentDashboard;