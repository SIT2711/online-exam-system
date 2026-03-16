import React from "react";
import "../styles/ResultHistory.css";

function ResultHistory() {
  const results = [
    {
      examName: "Math Test",
      score: "8/10",
      percentage: "80%",
      date: "20 Mar"
    },
    {
      examName: "Physics Quiz",
      score: "7/10",
      percentage: "70%",
      date: "18 Mar"
    },
    {
      examName: "Chemistry Test",
      score: "9/10",
      percentage: "90%",
      date: "15 Mar"
    }
  ];

  return (
    <div className="result-history-container">
      <h2>Result History</h2>

      <div className="result-card">
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.examName}</td>
                <td>{result.score}</td>
                <td>{result.percentage}</td>
                <td>{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultHistory;