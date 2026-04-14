import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AttemptExam.css";

function AttemptExam() {
  const { exam_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* FETCH QUESTIONS */
  useEffect(() => {
    fetch(
      `http://localhost/online-exam-system/exam/get_exam_questions.php?exam_id=${exam_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [exam_id]);

  /* STORE ANSWER (IMPORTANT FIX) */
  const handleOptionChange = (question_id, option_id) => {
    setAnswers((prev) => ({
      ...prev,
      [question_id]: Number(option_id),
    }));
  };

  /* SUBMIT EXAM */
  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);

    const payload = {
      exam_id: Number(exam_id),
      student_id: Number(user.id),
      answers: answers,
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/attempt/submit_exam.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);

      if (data.status === "success") {
        alert("Exam Submitted! Score: " + data.score);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }

    setSubmitting(false);
  };

  return (
    <div className="exam-container">
      <h1 className="title">ATTEMPT EXAM</h1>
      <p className="subtitle">Choose correct answers</p>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : questions.length === 0 ? (
        <p className="no-questions">No questions found</p>
      ) : (
        <>
          {questions.map((q, index) => (
            <div key={q.question_id} className="question-card">
              <h3 className="question-text">
                {index + 1}. {q.question_text}
              </h3>

              {q.options.map((opt) => (
                <label key={opt.option_id} className="option">
                  <input
                    type="radio"
                    name={`q_${q.question_id}`}
                    onChange={() =>
                      handleOptionChange(q.question_id, opt.option_id)
                    }
                  />
                  <span>{opt.option_text}</span>
                </label>
              ))}
            </div>
          ))}

          <div className="submit-container">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default AttemptExam;