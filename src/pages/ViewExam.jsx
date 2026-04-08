import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ViewExam.css";

function ViewExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  // ✅ FETCH QUESTIONS
  const fetchQuestions = useCallback(() => {
    if (!id) return;

    fetch(
      `http://localhost/online-exam-system/exam/get_exam_questions.php?exam_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        // ✅ Handle both formats (important fix)
        if (data.status === "success") {
          setQuestions(data.questions || []);
        } else if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, [id]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // ❗ SAFE CHECK AFTER HOOKS
  if (!id) {
    return <p style={{ textAlign: "center" }}>No exam selected</p>;
  }

  // ✅ DELETE QUESTION (FIXED 🔥)
  const handleDelete = (questionId) => {
    if (!window.confirm("Delete this question?")) return;

    fetch("http://localhost/online-exam-system/exam/delete_question.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: questionId }), // ✅ FIXED (was question_id)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DELETE RESPONSE:", data);

        if (data.status === "success") {
          // ✅ Remove from UI instantly
          setQuestions((prev) =>
            prev.filter((q) => q.question_id !== questionId)
          );
        } else {
          alert("Delete failed");
        }
      })
      .catch((err) => console.error("DELETE ERROR:", err));
  };

  // ✅ EDIT QUESTION
  const handleEdit = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  return (
    <div className="view-exam-container">
      <h2>Exam Questions</h2>

      {questions.length === 0 ? (
        <p>No questions available</p>
      ) : (
        questions.map((q, index) => (
          <div key={q.question_id} className="question-card">
            
            {/* QUESTION */}
            <h4>
              Q{index + 1}: {q.question_text}
            </h4>

            {/* OPTIONS */}
            <ul className="options-list">
              {q.options?.map((opt, i) => (
                <li
                  key={i}
                  className={
                    Number(opt.is_correct) === 1 ? "correct" : ""
                  }
                >
                  {String.fromCharCode(65 + i)}. {opt.option_text}
                </li>
              ))}
            </ul>

            {/* BUTTONS */}
            <div className="bottom-buttons">
              <button onClick={() => handleEdit(q.question_id)}>
                Edit
              </button>

              <button onClick={() => handleDelete(q.question_id)}>
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default ViewExam;