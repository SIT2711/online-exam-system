import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/EditExam.css";

function EditExam() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // ✅ Get exam data from navigation
  const examData = location.state;

  const [formData, setFormData] = useState({
    examName: "",
    subject: "",
    duration: "",
    totalmarks: "",
    startDate: "",
    endDate: ""
  });

  // ✅ Prefill data
  useEffect(() => {
    if (examData) {
      setFormData({
        examName: examData.examName || "",
        subject: examData.subject || "",
        duration: examData.duration?.replace(" minutes", "") || "",
        totalmarks: examData.totalmarks || "",
        startDate: "",
        endDate: ""
      });
    }
  }, [examData]);

  // ✅ Handle change + auto end date
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

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

  // ✅ Update Exam
  const handleUpdate = async (e) => {
  e.preventDefault();

  const updatedExam = {
    id: Number(id),
    examName: formData.examName,
    subject: formData.subject,
    duration: Number(formData.duration),
    totalmarks: Number(formData.totalmarks),
    startDate: formData.startDate,
    endDate: formData.endDate,
  };

  const res = await fetch(
    "http://localhost/online-exam-system/exam/update_exam.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExam),
    }
  );

  const data = await res.json();

  if (data.status === "success") {
    alert("Updated successfully");
    navigate("/exams");
  }
};


  // ✅ Cancel
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="edit-exam-container">
      <div className="edit-exam-card">
        <h2>Edit Exam</h2>

        <form onSubmit={handleUpdate}>
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

          <label>End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            readOnly
          />

          {/* ✅ BUTTONS */}
          <div className="btn-group">
            <button type="submit" className="update-btn">
              Update
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExam;