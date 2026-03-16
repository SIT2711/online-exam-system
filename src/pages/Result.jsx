import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state || {
    studentName: "Rahul",
    examName: "Math Test",
    totalQuestions: 10,
    correctAnswers: 8,
  };

  const scorePercentage = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100
  );

  return (
    <div className="result-page">
      <div className="result-card">
        <h2 className="result-title">Exam Result</h2>

        <p>
          <strong>Student:</strong> {result.studentName}
        </p>

        <p>
          <strong>Exam:</strong> {result.examName}
        </p>

        <hr />

        <p>
          <strong>Total Questions:</strong> {result.totalQuestions}
        </p>

        <p>
          <strong>Correct Answers:</strong> {result.correctAnswers}
        </p>

        <hr />

        <h3 className="score">Score: {scorePercentage}%</h3>

        <button className="home-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Result;