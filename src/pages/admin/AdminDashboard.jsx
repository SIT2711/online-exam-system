import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalExams: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalQuestions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost/online-exam-system/dashboard/admin-dashboard.php"); // 🔥 change if needed
      setDashboardData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching dashboard:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{dashboardData.totalExams}</h2>
          <p>Total Exams</p>
        </div>

        <div className="dashboard-card">
          <h2>{dashboardData.totalStudents}</h2>
          <p>Total Students</p>
        </div>

        <div className="dashboard-card">
          <h2>{dashboardData.totalTeachers}</h2>
          <p>Total Teachers</p>
        </div>

        <div className="dashboard-card">
          <h2>{dashboardData.totalQuestions}</h2>
          <p>Total Questions</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;