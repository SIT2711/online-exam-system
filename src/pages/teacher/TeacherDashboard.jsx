import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

function TeacherDashboard() {
  const [data, setData] = useState({
    createdExams: 0,
    questionsAdded: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherDashboard();
  }, []);

  const fetchTeacherDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `http://localhost/online-exam-system/dashboard/teacher-dashboard.php?teacher_id=${user.id}`
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
      <h1 className="dashboard-title">Teacher Dashboard</h1>
      <p>Welcome! Manage your exams and questions here.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{data.createdExams}</h2>
          <p>Created Exams</p>
        </div>

        <div className="dashboard-card">
          <h2>{data.questionsAdded}</h2>
          <p>Questions Added</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;