import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Exam.css";

function Exam() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    examName: "",
    subject: "",
    duration: "",
    totalmarks: "",
    startDate: "",
    endDate: ""
  });

  // ✅ NEW STATES (for popup)
  const [examCode, setExamCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Auto calculate end date
    if (name === "startDate" || name === "duration") {
      const start = name === "startDate" ? value : updatedData.startDate;
      const duration = name === "duration" ? value : updatedData.duration;

      if (start && duration) {
        const startTime = new Date(start);
        const endTime = new Date(startTime.getTime() + duration * 60000);

        const formattedEnd = new Date(
          endTime.getTime() - endTime.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        updatedData.endDate = formattedEnd;
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/ONLINE-EXAM-SYSTEM/exam/create_exam.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            teacher_id: user.id,
            exam_title: formData.examName,
            subject: formData.subject,
            duration: parseInt(formData.duration),
            total_marks: parseInt(formData.totalmarks),
            start_date: formData.startDate.replace("T", " ") + ":00",
            end_date: formData.endDate.replace("T", " ") + ":00"
          })
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // ✅ SHOW POPUP INSTEAD OF ALERT
        setExamCode(data.exam_code);
        setShowModal(true);

        // Reset form
        setFormData({
          examName: "",
          subject: "",
          duration: "",
          totalmarks: "",
          startDate: "",
          endDate: ""
        });

      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
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

          <label>Total Marks</label>
          <input
            type="number"
            name="totalmarks"
            value={formData.totalmarks}
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

          <label>End Date (Auto Calculated)</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            readOnly
          />

          <button type="submit">Create Exam</button>
        </form>
      </div>

      {/* ✅ POPUP MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ Exam Created</h2>
            <p>Exam Code: <b>{examCode}</b></p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(examCode);
                alert("Copied!");
              }}
            >
              Copy Code
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                navigate("/exams");
              }}
            >
              Go to Exams
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exam;