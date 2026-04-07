import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../styles/ExamList.css";

const ExamList = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const [examList, setExamList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost/online-exam-system/exam/get_exams.php")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        if (data.status === "success") {
          setExamList(data.data);
        }
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete exam?")) return;

    setLoadingId(id);

    const res = await fetch(
      "http://localhost/online-exam-system/exam/delete_exam.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      setExamList(prev => prev.filter(e => e.exam_id !== id));
    }

    setLoadingId(null);
  };

  const handleEdit = (exam) => {
    navigate(`/edit-exam/${exam.exam_id}`, { state: exam });
  };

  const handleView = (exam) => {
    navigate("/viewExam", { state: exam });
  };



  return (
    <div className="exam-list-container">
      
      {/* ✅ HEADER */}
      <div className="top-bar">
        <h1 className="page-title">Available Exams</h1>

        {(userRole === "admin" || userRole === "teacher") && (
          <button
            className="create-exam-btn"
            onClick={() => navigate("/exam")}
          >
            + Create Exam
          </button>
        )}
      </div>

      {/* ✅ EXAM LIST */}
      <div className="exam-cards-container">
        {examList.map((exam) => (
          <div className="exam-card" key={exam.exam_id}>
            <div className="exam-content">
              <h2 className="exam-name">{exam.exam_title}</h2>
              <p className="subject">{exam.subject}</p>
              <p className="duration">
                {exam.duration >= 60
                  ? (exam.duration % 60 === 0
                      ? `${exam.duration / 60} hours`
                      : `${(exam.duration / 60).toFixed(1)} hours`)
                  : `${exam.duration} minutes`}
              </p>
            </div>

            {/* ✅ STUDENT VIEW */}
            {userRole === "student" && (
            <div className="action-buttons">
              <button
                className="start-exam-btn"
                onClick={() => navigate("/attemptexam")}
                disabled={loadingId === exam.id}
              >
                {loadingId === exam.id ? "Loading..." : "Start Exam"}
              </button>
            </div>
          )}


            {/* ✅ ADMIN / TEACHER VIEW */}
            {(userRole === "admin" || userRole === "teacher") && (
              <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => handleEdit(exam)}
                disabled={loadingId === exam.exam_id}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(exam.exam_id)}
                disabled={loadingId === exam.exam_id}
              >
                {loadingId === exam.id ? "Deleting..." : "Delete"}
              </button>

              <button
                className="view-btn"
                onClick={() => handleView(exam)}
              >
                View
              </button>
            </div>

            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;