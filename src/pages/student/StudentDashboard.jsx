import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

function StudentDashboard() {
  const [data, setData] = useState({
    upcomingExams: 0,
    completedExams: 0,
    resultsPublished: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDashboard();
  }, []);

  const fetchStudentDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `http://localhost/online-exam-system/dashboard/student-dashboard.php?student_id=${user.id}`
      );

      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{data.upcomingExams}</h2>
          <p>Upcoming Exams</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.completedExams}</h2>
          <p>Completed Exams</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.resultsPublished}</h2>
          <p>Results Published</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;