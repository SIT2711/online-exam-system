import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubmitExam = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { answers = {}, questions = [], name } = state || {};

  const unanswered = questions.length - Object.keys(answers).length;

  return (
    <div className="card">
      <h2>Submit Exam</h2>

      <p>You have {unanswered} unanswered questions</p>

      <button className="btn cancel" onClick={() => navigate(-1)}>Cancel</button>

      <button
        className="btn"
        onClick={() => navigate("/result", { state })}
      >
        Submit Exam
      </button>
    </div>
  );
};

export default SubmitExam;