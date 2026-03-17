import React, { useEffect, useState } from "react";

const ResultHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  }, []);

  return (
    <div className="card">
      <h2>Result History</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Exam</th>
            <th>Score</th>
            <th>%</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.exam}</td>
              <td>{item.score}</td>
              <td>{item.percent}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultHistory;