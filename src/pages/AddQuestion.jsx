import React, { useState, useEffect } from "react";
import "../styles/AddQuestion.css";

function AddQuestion() {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [success, setSuccess] = useState(false);

  
  useEffect(() => {
    fetch("http://localhost/online-exam-system/exam/get_exams.php")
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!examId) {
      alert("Please select exam");
      return;
    }

    const payload = {
      exam_id: examId,
      question_text: formData.question,
      question_type: "MCQ",
      marks: 1
    };

    try {
      const response = await fetch(
        "http://localhost/online-exam-system/exam/add_question.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (data.status === "success") {
        setSuccess(true);

        // Reset form
        setFormData({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: ""
        });

        setExamId("");

        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(data.message || "Error adding question");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2>Add Question</h2>

        {success && (
          <div className="success-msg">Question added successfully!!</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 🔽 Exam Dropdown */}
          <label>Select Exam</label>
<select
  value={examId}
  onChange={(e) => setExamId(e.target.value)}
  required
>
  <option value="">-- Select Exam --</option>
  {exams.map((exam) => (
    <option key={exam.exam_id} value={exam.exam_id}>
      {exam.exam_title}
    </option>
  ))}
</select>

          <label>Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />

          <label>Option A</label>
          <input
            type="text"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            required
          />

          <label>Option B</label>
          <input
            type="text"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            required
          />

          <label>Option C</label>
          <input
            type="text"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            required
          />

          <label>Option D</label>
          <input
            type="text"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            required
          />

          <label>Correct Answer</label>
          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            required
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          <button type="submit">Add Question</button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;