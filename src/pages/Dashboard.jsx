import './styles/Dashboard.css';

function Dashboard() {

  const dashboardData = [
    { title: "Total Exams", value: 12 },
    { title: "Upcoming Exams", value: 3 },
    { title: "Completed Exams", value: 8 },
    { title: "Results", value: 5 }
  ];

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">System Overview</h1>

      <div className="dashboard-cards">
        {dashboardData.map((item, index) => (
          <div key={index} className="dashboard-card">
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;