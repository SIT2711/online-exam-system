import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ExamTimer from "./ExamTimer";
import SubmitExam from "./SubmitExam";
import "../styles/AttemptExam.css";

function AttemptExam() {
  const navigate = useNavigate();

  // ✅ FIX: safe param handling
  const params = useParams();
  const exam_id = params.exam_id || params.id;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

  // ✅ FIX: safe student id
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const student_id = storedUser.user_id || storedUser.id || 2;

  // ================= FETCH EXAM =================
  useEffect(() => {
    if (!exam_id) return; // ✅ FIX

    fetch(
      `http://localhost/online-exam-system/exam/get_exam_questions.php?exam_id=${exam_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data); // ✅ DEBUG

        if (data.status === "success") {
          setQuestions(data.questions || []);
          setDuration(Number(data.duration) || 0);
        }
      })
      .catch((err) => console.error("Fetch Error:", err)) // ✅ FIX
      .finally(() => setLoading(false));
  }, [exam_id]);

  // ================= ANSWER =================
  const handleOptionChange = (qId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      // ✅ FIX: validations
      if (!exam_id) {
        alert("Exam ID missing");
        return { score: 0, percentage: 0 };
      }

      if (!student_id) {
        alert("Student not logged in");
        return { score: 0, percentage: 0 };
      }

      if (Object.keys(answers).length === 0) {
        alert("Please answer at least one question");
        return { score: 0, percentage: 0 };
      }

      // ✅ DEBUG (VERY IMPORTANT)
      console.log("exam_id:", exam_id);
      console.log("student_id:", student_id);
      console.log("answers:", answers);

      const formData = new FormData();
      formData.append("exam_id", exam_id);
      formData.append("student_id", student_id);
      formData.append("answers", JSON.stringify(answers));

      const res = await fetch(
        "http://localhost/online-exam-system/attempt/submit_exam.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("RESULT:", data); // ✅ DEBUG

      return data;

    } catch (err) {
      console.error(err);
      return { score: 0, percentage: 0 };
    }
  };

  if (loading) {
    return <div className="loading">Loading Exam...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-container">

      <h2 className="exam-title">Attempt Exam</h2>

      {/* TIMER */}
      <div className="timer-container">
        <ExamTimer
          duration={duration}
          onTimeUp={() => setShowSubmit(true)}
        />
      </div>

      {/* NO QUESTIONS */}
      {questions.length === 0 ? (
        <div className="no-questions">No questions found for this exam</div>
      ) : (
        <>
          {/* QUESTION BOX */}
          <div className="question-box">

            <h3 className="question-text">
              {currentIndex + 1}. {currentQuestion.question_text}
            </h3>

            {currentQuestion.options.map((opt) => (
              <label key={opt.option_id} className="option">

                <input
                  type="radio"
                  name={currentQuestion.question_id}
                  checked={
                    answers[currentQuestion.question_id] === opt.option_id
                  }
                  onChange={() =>
                    handleOptionChange(
                      currentQuestion.question_id,
                      opt.option_id
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
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                className="submit-btn"
                onClick={() => setShowSubmit(true)}
              >
                Submit Exam
              </button>
            ) : (
              <button
                className="next-btn"
                onClick={() => setCurrentIndex((p) => p + 1)}
              >
                Next
              </button>
            )}

          </div>
        </>
      )}

      {/* SUBMIT POPUP */}
      {showSubmit && (
        <SubmitExam
          unansweredQuestions={
            questions.length - Object.keys(answers).length
          }
          onCancel={() => setShowSubmit(false)}
          onSubmit={handleSubmit}
        />
      )}

    </div>
  );
}

export default AttemptExam;