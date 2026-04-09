import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

function StudentDashboard() {
  const [data, setData] = useState({
    upcomingExams: 0,
    completedExams: 0,
    resultsPublished: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const student_id = user?.id;

    fetch(`http://localhost/online-exam-system/dashboard/student-dashboard.php?student_id=${student_id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API DATA:", res); // 👈 check in console
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

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