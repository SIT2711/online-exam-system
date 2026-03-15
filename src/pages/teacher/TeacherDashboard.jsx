import React from "react";

function TeacherDashboard() {

  const dashboardData = [
    { title: "Total Exams", value: 10 },
    { title: "Upcoming Exams", value: 4 },
    { title: "Completed Exams", value: 6 },
    { title: "Results", value: 5 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teacher Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {dashboardData.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "180px",
              textAlign: "center",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
            }}
          >
            <h3>{item.title}</h3>
            <p style={{ fontSize: "26px", fontWeight: "bold" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;