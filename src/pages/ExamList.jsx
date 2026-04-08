import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../styles/ExamList.css";

const ExamList = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const [examList, setExamList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 6;

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



  // Filter exams by search term (title or subject)
  let filteredExams = examList;
  if (searchTerm.trim() !== "") {
    filteredExams = examList.filter(
      (exam) =>
        (exam.exam_title && exam.exam_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exam.subject && exam.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // Sort exams (latest first)
  let sortedExams = [...filteredExams];
  sortedExams.sort((a, b) => {
    if (a.start_date && b.start_date) {
      return new Date(b.start_date) - new Date(a.start_date);
    }
    return b.exam_id - a.exam_id;
  });

  // Pagination for teachers
  let visibleExams = sortedExams;
  let totalPages = 1;
  if (userRole === "teacher") {
    totalPages = Math.ceil(sortedExams.length / examsPerPage) || 1;
    const startIdx = (currentPage - 1) * examsPerPage;
    visibleExams = sortedExams.slice(startIdx, startIdx + examsPerPage);
  }

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

      {/* ✅ SEARCH BAR */}
      <div style={{ margin: "16px 0", display: "flex", justifyContent: "flex-end" }}>
        <input
          type="text"
          placeholder="Search by title or subject..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "8px", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* ✅ EXAM LIST */}
      <div className="exam-cards-container">
        {visibleExams.length === 0 ? (
          <div style={{ textAlign: "center", width: "100%", color: "#888" }}>No exams found.</div>
        ) : (
          visibleExams.map((exam) => (
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
                    disabled={loadingId === exam.exam_id}
                  >
                    {loadingId === exam.exam_id ? "Loading..." : "Start Exam"}
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
                    {loadingId === exam.exam_id ? "Deleting..." : "Delete"}
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
          ))
        )}
      </div>

      {/* ✅ PAGINATION (for teachers) */}
      {userRole === "teacher" && totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ marginRight: 8 }}
          >
            Prev
          </button>
          <span style={{ alignSelf: "center" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ marginLeft: 8 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamList;