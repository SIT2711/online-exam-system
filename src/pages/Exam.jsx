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

    // ✅ GET USER
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("USER:", user); // debug

    // ✅ SAFETY CHECK
    if (!user || !user.id) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/online-exam-system/exam/create_exam.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            // ✅ FIXED HERE
            teacher_id: user.id,
            exam_title: formData.examName,
            subject: formData.subject,
            duration: parseInt(formData.duration),
            total_marks: parseInt(formData.totalQuestions),
            // ✅ FIX DATE FORMAT
            start_date: formData.startDate.replace("T", " ") + ":00",
            end_date: formData.endDate.replace("T", " ") + ":00"
          })
        }
      );

      const data = await response.json();

      console.log("RESPONSE:", data);

      if (data.status === "success") {
        alert("✅ Exam created successfully!");

        setFormData({
          examName: "",
          subject: "",
          duration: "",
          totalQuestions: "",
          startDate: "",
          endDate: ""
        });
      } else {
        alert("❌ Error: " + data.message);
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