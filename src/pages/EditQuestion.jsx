import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditQuestion.css";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question_text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // ✅ FETCH QUESTION
  useEffect(() => {
    fetch(`http://localhost/online-exam-system/exam/get_single_question.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const q = data.question;

          // ✅ Convert value → A/B/C/D
          let correct = "";
          if (q.correctAnswer === q.optionA) correct = "A";
          else if (q.correctAnswer === q.optionB) correct = "B";
          else if (q.correctAnswer === q.optionC) correct = "C";
          else if (q.correctAnswer === q.optionD) correct = "D";

          setForm({
            ...q,
            correctAnswer: correct,
          });
        } else {
          alert("Question not found");
        }
      })
      .catch((err) => console.log("Fetch error:", err));
  }, [id]);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE QUESTION
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/online-exam-system/exam/update_question.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        question_text: form.question_text,
        optionA: form.optionA,
        optionB: form.optionB,
        optionC: form.optionC,
        optionD: form.optionD,

        // ✅ Convert A/B/C/D → actual value
        correctAnswer:
          form.correctAnswer === "A"
            ? form.optionA
            : form.correctAnswer === "B"
            ? form.optionB
            : form.correctAnswer === "C"
            ? form.optionC
            : form.optionD,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Question updated successfully ✅");
          navigate(-1);
        } else {
          alert(data.message || "Update failed ❌");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("Server not reachable ❌");
      });
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2>Edit Question</h2>

        <form onSubmit={handleSubmit} className="edit-form">

          <label>Question</label>
          <input
            name="question_text"
            value={form.question_text}
            onChange={handleChange}
            required
          />

          <div className="grid-2">

            <div>
              <label>Option A</label>
              <input
                name="optionA"
                value={form.optionA}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Option B</label>
              <input
                name="optionB"
                value={form.optionB}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Option C</label>
              <input
                name="optionC"
                value={form.optionC}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Option D</label>
              <input
                name="optionD"
                value={form.optionD}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* ✅ FIXED: Show A/B/C/D instead of value */}
          <label>Correct Answer (A / B / C / D)</label>
          <select
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleChange}
            required
          >
            <option value="">Select correct option</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <button type="submit" className="update-btn">
            Update Question
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditQuestion;