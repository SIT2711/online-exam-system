import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ExamList.css";

const ExamList = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;
  const userId = user?.id;

  const [examList, setExamList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedExam, setSearchedExam] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 3;

  // ✅ FETCH ONLY FOR ADMIN / TEACHER
  useEffect(() => {
    if (userRole === "student") return;

    fetch("http://localhost/online-exam-system/exam/get_exams.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          let exams = data.data;

          if (userRole === "teacher" && userId) {
            exams = exams.filter(
              (exam) => String(exam.teacher_id) === String(userId)
            );
          }

          setExamList(exams);
        }
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, [userRole, userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    setLoadingId(id);

    try {
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
        setExamList((prev) => prev.filter((e) => e.exam_id !== id));
      } else {
        alert("Error: " + (data.message || "Failed to delete exam."));
      }
    } catch (err) {
      console.error("DELETE FETCH ERROR:", err);
      alert("Network error or server is down.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (exam) => {
    navigate(`/edit-exam/${exam.exam_id}`, { state: exam });
  };

  const handleView = (exam) => {
    navigate(`/viewExam/${exam.exam_id}`);
  };

  // ✅ FIXED SEARCH FUNCTION
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter exam code");
      return;
    }

    fetch("http://localhost/online-exam-system/exam/getExamByCode.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exam_code: searchTerm.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data); // 🔍 debug

        if (data.status === "success") {
          setSearchedExam(data.data);
        } else {
          setSearchedExam(null);
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        alert("Server connection failed");
      });
  };

  // 🔍 FILTER (ONLY FOR TEACHER / ADMIN)
  let filteredExams = examList;
  if (searchTerm.trim() !== "" && userRole !== "student") {
    filteredExams = examList.filter(
      (exam) =>
        (exam.exam_title &&
          exam.exam_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exam.subject &&
          exam.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // 📅 SORT
  let sortedExams = [...filteredExams];
  sortedExams.sort((a, b) => {
    if (a.start_date && b.start_date) {
      return new Date(b.start_date) - new Date(a.start_date);
    }
    return b.exam_id - a.exam_id;
  });

  // 📄 PAGINATION
  let visibleExams = sortedExams;
  let totalPages = 1;

  if (userRole === "teacher") {
    totalPages = Math.ceil(sortedExams.length / examsPerPage) || 1;
    const startIdx = (currentPage - 1) * examsPerPage;
    visibleExams = sortedExams.slice(startIdx, startIdx + examsPerPage);
  }

  return (
    <div className="exam-list-container">

      {/* HEADER */}
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

      {/* SEARCH */}
      {userRole === "student" ? (
        <div style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Enter your exam code to start your exam"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      ) : (
        <div style={{ margin: "16px 0", display: "flex", justifyContent: "flex-end" }}>
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* EXAMS */}
      <div className="exam-cards-container">
        {userRole === "student" ? (
          searchedExam ? (
            <div className="exam-card">
              <div className="exam-content">
                <h2 className="exam-name">{searchedExam.exam_title}</h2>
                <p className="subject">{searchedExam.subject}</p>
                <p className="duration">{searchedExam.duration} minutes</p>
              </div>

              <div className="action-buttons">
                <button
                  className="start-exam-btn"
                  onClick={() =>
                    navigate(`/attemptexam/${searchedExam.exam_id}`)
                  }
                >
                  Start Exam
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", width: "100%", color: "#888" }}>
              Enter exam code to see exam
            </div>
          )
        ) : visibleExams.length === 0 ? (
          <div style={{ textAlign: "center", width: "100%", color: "#888" }}>
            No exams found.
          </div>
        ) : (
          visibleExams.map((exam) => (
            <div className="exam-card" key={exam.exam_id}>
              <div className="exam-content">
                <h2 className="exam-name">{exam.exam_title}</h2>
                <p className="subject">{exam.subject}</p>
                <p className="duration">{exam.duration} minutes</p>
              </div>

              {(userRole === "admin" || userRole === "teacher") && (
                <div className="action-buttons">
                  <button onClick={() => handleEdit(exam)}>Edit</button>
                  <button onClick={() => handleDelete(exam.exam_id)}>
                    {loadingId === exam.exam_id ? "Deleting..." : "Delete"}
                  </button>
                  <button onClick={() => handleView(exam)}>View</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamList;