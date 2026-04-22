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

          let correct = "";
          if (q.correctAnswer === q.optionA) correct = "A";
          else if (q.correctAnswer === q.optionB) correct = "B";
          else if (q.correctAnswer === q.optionC) correct = "C";
          else if (q.correctAnswer === q.optionD) correct = "D";

          setForm({
            ...q,
            correctAnswer: correct,
          });
        }
      })
      .catch((err) => console.log("Fetch error:", err));
  }, [id]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: Number(id),
      question_text: form.question_text,
      optionA: form.optionA,
      optionB: form.optionB,
      optionC: form.optionC,
      optionD: form.optionD,
      correctAnswer:
        form.correctAnswer === "A"
          ? form.optionA
          : form.correctAnswer === "B"
            ? form.optionB
            : form.correctAnswer === "C"
              ? form.optionC
              : form.optionD,
    };

    console.log("SENDING:", payload);

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/exam/update_question.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      try {
        const data = JSON.parse(text);

        if (data.status === "success") {
          alert("Question updated successfully ✅");
          navigate(-1);
        } else {
          alert(data.message || "Update failed ❌");
        }

      } catch (err) {
        console.error("JSON ERROR:", text);
        alert("Server returned invalid response ❌");
      }

    } catch (err) {
      console.log("Error:", err);
      alert("Server error ❌");
    }
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
              <input name="optionA" value={form.optionA} onChange={handleChange} required />
            </div>

            <div>
              <label>Option B</label>
              <input name="optionB" value={form.optionB} onChange={handleChange} required />
            </div>

            <div>
              <label>Option C</label>
              <input name="optionC" value={form.optionC} onChange={handleChange} required />
            </div>

            <div>
              <label>Option D</label>
              <input name="optionD" value={form.optionD} onChange={handleChange} required />
            </div>

          </div>

          <label>Correct Answer</label>
          <select
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
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