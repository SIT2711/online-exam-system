import React, { useState } from "react";
import "../styles/Exam.css";

function Exam() {
  const [formData, setFormData] = useState({
    examName: "",
    subject: "",
    duration: "",
    totalQuestions: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Created:", formData);
  };

  return (
    <div className="exam-page-container">
      <div className="exam-card">
        <h2>Create Exam</h2>

        <form onSubmit={handleSubmit}>

          <label>Exam Name</label>
          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            required
          />

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          <label>Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={formData.totalQuestions}
            onChange={handleChange}
            required
          />

          <label>Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <label>End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Exam</button>

        </form>
      </div>
    </div>
  );
}

export default Exam;