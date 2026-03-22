// SubmitExam.jsx
import React from 'react';
import "../styles/SubmitExam.css"; // Correct path if CSS is in src/styles/

const SubmitExam = ({ unansweredQuestions, onCancel, onSubmit }) => {
  return (
    <div className="container">
      <div className="card">
        <h3 className="header">Submit Exam</h3>
        <p className="text">You have {unansweredQuestions} unanswered questions</p>
        
        <div className="buttonContainer">
          <button onClick={onCancel} className="cancelButton">Cancel</button>
          <button onClick={onSubmit} className="submitButton">Submit Exam</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitExam;