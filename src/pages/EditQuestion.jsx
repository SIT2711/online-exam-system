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
          setForm(data.question);
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

  // ✅ UPDATE QUESTION (FIXED)
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
        correctAnswer: form.correctAnswer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

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

          <label>Correct Answer (A / B / C / D)</label>
          <input
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleChange}
            required
          />

          <button type="submit" className="update-btn">
            Update Question
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditQuestion;