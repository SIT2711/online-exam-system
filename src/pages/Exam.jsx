import React, { useState } from "react";
import "../styles/Exam.css";

function Exam() {
  const [examData, setExamData] = useState({
    examName: "",
    subject: "",
    duration: "",
    totalQuestions: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Created:", examData);
    alert("Exam Created Successfully!");
  };

  return (
    <div className="exam-container">
      <div className="exam-card">
        <h2>Create Exam</h2>

        <form onSubmit={handleSubmit}>

          <label>Exam Name</label>
          <input
            type="text"
            name="examName"
            value={examData.examName}
            onChange={handleChange}
            required  />

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={examData.subject}
            onChange={handleChange}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={examData.duration}
            onChange={handleChange}
            required
          />

          <label>Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={examData.totalQuestions}
            onChange={handleChange}
            required
          />

          <label>Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={examData.startDate}
            onChange={handleChange}
            required
          />

          <label>End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={examData.endDate}
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