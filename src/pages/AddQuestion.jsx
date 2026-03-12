import React, { useState } from "react";
import "./AddQuestion.css";

function AddQuestion() {
  const [data, setData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question added:", data);
    alert("Question added!");
    setData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    });
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2>Add Question</h2>
        <form onSubmit={handleSubmit}>
          <label>Question</label>
          <textarea name="question" value={data.question} onChange={handleChange} required />
          <label>Option A</label>
          <input type="text" name="optionA" value={data.optionA} onChange={handleChange} required />
          <label>Option B</label>
          <input type="text" name="optionB" value={data.optionB} onChange={handleChange} required />
          <label>Option C</label>
          <input type="text" name="optionC" value={data.optionC} onChange={handleChange} required />
          <label>Option D</label>
          <input type="text" name="optionD" value={data.optionD} onChange={handleChange} required />
          <label>Correct Answer</label>
          <select name="correctAnswer" value={data.correctAnswer} onChange={handleChange} required>
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