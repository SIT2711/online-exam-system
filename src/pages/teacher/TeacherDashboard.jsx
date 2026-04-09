import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

function TeacherDashboard() {
  const [data, setData] = useState({
    createdExams: 0,
    questionsAdded: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost/online-exam-system/dashboard/teacher-dashboard.php?teacher_id=${user.id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Teacher Dashboard</h1>

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