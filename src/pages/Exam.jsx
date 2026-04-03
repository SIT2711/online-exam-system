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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/online-exam-system/exam/create_exam.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            exam_title: formData.examName,
            subject: formData.subject,
            duration: formData.duration,
            total_marks: formData.totalQuestions,
            start_date: formData.startDate,
            end_date: formData.endDate,
            teacher_id: "1" // ✅ fixed
          })
        }
      );

      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (data.success) {
        alert("Exam created successfully!");

        setFormData({
          examName: "",
          subject: "",
          duration: "",
          totalQuestions: "",
          startDate: "",
          endDate: ""
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("ERROR:", err);
      alert("Request failed: " + err.message);
    }
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