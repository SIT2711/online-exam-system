import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

function AdminDashboard() {
  const [data, setData] = useState({
    totalExams: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalQuestions: 0,
  });

  useEffect(() => {
    fetch("http://localhost/online-exam-system/dashboard/admin-dashboard.php")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{data.totalExams}</h2>
          <p>Total Exams</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.totalStudents}</h2>
          <p>Total Students</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.totalTeachers}</h2>
          <p>Total Teachers</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.totalQuestions}</h2>
          <p>Total Questions</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;