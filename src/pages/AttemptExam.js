import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AttemptExam() {
  const { exam_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch(`http://localhost/online-exam-system/exam/get_exam_questions.php?exam_id=${exam_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setQuestions(data.questions);
        } else {
          setQuestions([]);
          alert("No questions found");
        }
      });
  }, [exam_id]);

  const handleOptionChange = (question_id, option) => {
    setAnswers({
      ...answers,
      [question_id]: option,
    });
  };

  const handleSubmit = async () => {

    const studentId = user.id || user.user_id;

    if (!studentId) {
      alert("User not found. Please login again.");
      return;
    }

    if (Object.keys(answers).length === 0) {
      alert("Please attempt at least one question");
      return;
    }

    try {
      // ✅ FORM DATA (NO CORS ISSUE)
      const formData = new FormData();
      formData.append("exam_id", exam_id);
      formData.append("student_id", studentId);
      formData.append("score", 0);
      formData.append("answers", JSON.stringify(answers));

      const res = await fetch(
        "http://localhost/online-exam-system/attempt/submit_exam.php",
        {
          method: "POST",
          body: formData, // ✅ no headers
        }
      );

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (data.status === "success") {
        alert("Exam submitted successfully!");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Attempt Exam</h2>

      {questions.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <>
          {questions.map((q, index) => (
            <div key={q.question_id} style={{ marginBottom: "20px" }}>
              <h4>{index + 1}. {q.question_text}</h4>

              {q.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={`question_${q.question_id}`}
                    value={opt.option_text}
                    checked={answers[q.question_id] === opt.option_text}
                    onChange={() =>
                      handleOptionChange(q.question_id, opt.option_text)
                    }
                  />
                  {opt.option_text}
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            Submit Exam
          </button>
        </>
      )}
    </div>
  );
}

export default AttemptExam;