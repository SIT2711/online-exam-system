import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ExamTimer from "./ExamTimer";
import "../styles/AttemptExam.css";

function AttemptExam() {
  const navigate = useNavigate();
  const { exam_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ================= FETCH EXAM =================
  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost/online-exam-system/exam/get_exam_questions.php?exam_id=${exam_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        if (data.status === "success") {
          setQuestions(data.questions || []);
          setDuration(Number(data.duration) || 0);
        } else {
          setQuestions([]);
          setDuration(0);
        }
      })
      .catch((err) => console.error("FETCH ERROR:", err))
      .finally(() => setLoading(false));
  }, [exam_id]);

  // ================= HANDLE ANSWER =================
  const handleOptionChange = (qId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  // ================= SUBMIT EXAM =================
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("exam_id", exam_id);
      formData.append("student_id", user.user_id);
      formData.append("answers", JSON.stringify(answers));

      await fetch(
        "http://localhost/online-exam-system/attempt/submit_exam.php",
        {
          method: "POST",
          body: formData,
        }
      );

      alert("Exam Submitted Successfully!");

      // ✅ REDIRECT AFTER SUBMIT
      navigate("/result");   // or "/student-dashboard"

    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="loading">Loading Exam...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-container">

      <h2 className="exam-title">Attempt Exam</h2>

      {/* TIMER */}
      <div className="timer-container">
        <ExamTimer duration={duration} onTimeUp={handleSubmit} />
      </div>

      {/* NO QUESTIONS */}
      {questions.length === 0 ? (
        <div className="no-questions">
          No questions found for this exam
        </div>
      ) : (
        <>
          {/* QUESTION BOX */}
          <div className="question-box">
            <h3 className="question-text">
              {currentIndex + 1}. {currentQuestion.question_text}
            </h3>

            {currentQuestion.options.map((opt, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  name={currentQuestion.question_id}
                  checked={
                    answers[currentQuestion.question_id] === opt.option_text
                  }
                  onChange={() =>
                    handleOptionChange(
                      currentQuestion.question_id,
                      opt.option_text
                    )
                  }
                />
                {opt.option_text}
              </label>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="nav-buttons">
            <button
              className="prev-btn"
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button className="submit-btn" onClick={handleSubmit}>
                Submit Exam
              </button>
            ) : (
              <button
                className="next-btn"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AttemptExam;