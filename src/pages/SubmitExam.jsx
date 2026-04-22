import React, { useState } from "react";
import "../styles/SubmitExam.css";

const SubmitExam = ({ unansweredQuestions, onCancel, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  
  const handleSubmit = async () => {
    const result = await onSubmit();

    console.log("RESULT:", result);

    // ✅ USE PERCENTAGE INSTEAD OF SCORE
    const finalScore = result?.percentage ?? 0;

    setScore(finalScore);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div className="card">

        {!submitted ? (
          <>
            <h3 className="header">Submit Exam</h3>

            <p className="text">
              You have {unansweredQuestions} unanswered questions
            </p>

            <div className="buttonContainer">

              <button onClick={onCancel} className="cancelButton">
                Cancel
              </button>

              <button onClick={handleSubmit} className="submitButton">
                Submit Exam
              </button>

            </div>
          </>
        ) : (
          <>
            <h3 className="header">✅ Exam submitted successfully</h3>

            <p className="text">
              Your Score: <b>{score}%</b> {/* ✅ add % */}
            </p>

            <p className="text">
              To see full result click below:
            </p>

            <a
              href={`/exam-result/${score}`}
              className="submitButton"
              style={{
                display: "inline-block",
                textDecoration: "none",
                textAlign: "center"
              }}
            >
              View Result
            </a>
          </>
        )}

      </div>
    </div>
  );
};
export default SubmitExam;