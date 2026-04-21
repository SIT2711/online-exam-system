import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ExamResult.css";

function ExamResult() {
  const { score } = useParams();
  const navigate = useNavigate();

  const percentage = Number(score) || 0;

  return (
    <div className="resultContainer">
      <div className="resultCard">

        {/* 🔥 PROGRESS CIRCLE */}
        <div
          className="scoreCircle"
          style={{
            background: `conic-gradient(#14B8A6 ${percentage}%, #e5e7eb ${percentage}%)`
          }}
        >
          <div className="innerCircle">
            {percentage}%
          </div>
        </div>

        <h2 className="resultTitle">🎉 Congratulations!</h2>

        <p className="resultMessage">
          You have successfully completed the exam.
        </p>

        <button
          className="resultButton"
          onClick={() => navigate("/student-dashboard")}
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}

export default ExamResult;