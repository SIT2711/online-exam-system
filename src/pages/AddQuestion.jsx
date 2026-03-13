import React, { useState } from "react";
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

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send formData to backend or API
    console.log("Question Added:", formData);

    // Show success message
    setSuccess(true);

    // Clear form
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    });

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2>Add Question</h2>

        {success && <div className="success-msg">Question added successfully!</div>}

        <form onSubmit={handleSubmit}>
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