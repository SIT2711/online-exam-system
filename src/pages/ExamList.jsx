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
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ NEW (student feature)
  const [examCodeInput, setExamCodeInput] = useState("");
  const [searchedExam, setSearchedExam] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const examsPerPage = 3;

  useEffect(() => {
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

  // ✅ SEARCH BY EXAM CODE (student only)
  const handleSearchExam = async () => {
    setErrorMsg("");
    setSearchedExam(null);

    if (!examCodeInput.trim()) {
      setErrorMsg("Please enter exam code");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/exam/get_exams.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exam_code: examCodeInput }),
        }
      );

      const data = await res.json();

      if (data.data.length === 0) {
        setErrorMsg("Invalid exam code");
        return;
      }

      const exam = data.data[0];

      // ⏱️ TIME CHECK
      const now = new Date();
      const start = new Date(exam.start_date);
      const end = new Date(exam.end_date);

      let status = "not_started";
      if (now >= start && now <= end) status = "active";
      else if (now > end) status = "ended";

      setSearchedExam({ ...exam, status });

    } catch (err) {
      console.error(err);
      setErrorMsg("Server error");
    }
  };

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
      const updatedList = examList.filter((e) => e.exam_id !== id);
      setExamList(updatedList);

      // ✅ FIX: Handle page adjustment
      const totalAfterDelete = updatedList.length;
      const newTotalPages = Math.ceil(totalAfterDelete / examsPerPage) || 1;

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } else {
      alert("Error deleting exam");
    }
  } catch (err) {
    console.error(err);
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

  // 🔍 FILTER
  let filteredExams = examList;
  if (searchTerm.trim() !== "") {
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

  // 📄 PAGINATION (teacher only)
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

      {/* 🔍 SEARCH (OLD - unchanged) */}
      {(userRole === "admin" || userRole === "teacher") && (
        <div style={{ margin: "16px 0", display: "flex", justifyContent: "flex-end" }}>
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}

      {/* 🧑‍🎓 STUDENT SEARCH UI */}
      {userRole === "student" && (
        <div style={{ margin: "16px 0", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Enter your exam code"
            value={examCodeInput}
            onChange={(e) => setExamCodeInput(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button onClick={handleSearchExam} style={{ marginLeft: "10px" }}>
            Search
          </button>

          {errorMsg && (
            <p style={{ color: "red", marginTop: "8px" }}>{errorMsg}</p>
          )}
        </div>
      )}

      {/* 🧑‍🎓 SHOW SEARCHED EXAM */}
      {userRole === "student" && searchedExam && (
        <div className="exam-card" style={{ marginBottom: "20px" }}>
          <div className="exam-content">
            <h2 className="exam-name">{searchedExam.exam_title}</h2>
            <p className="subject">{searchedExam.subject}</p>
            <p className="duration">{searchedExam.duration} minutes</p>
          </div>

          <div className="action-buttons" style={{ flexDirection: "column", alignItems: "center" }}>
  
  {/* STATUS TEXT */}
  {searchedExam.status === "not_started" && (
    <p style={{ color: "orange", marginBottom: "5px" }}>
      Exam not started yet
    </p>
  )}

  {searchedExam.status === "ended" && (
    <p style={{ color: "red", marginBottom: "5px" }}>
      Exam time is over
    </p>
  )}

  {searchedExam.status === "active" && (
    <p style={{ color: "green", marginBottom: "5px" }}>
      Exam is live
    </p>
  )}

  {/* BUTTON */}
  <button
    className="start-exam-btn"
    style={{ width: "100%" }}   // 🔥 IMPORTANT
    disabled={searchedExam.status !== "active"}
    onClick={() =>
      navigate(`/attemptexam/${searchedExam.exam_id}`) 
    }
  >
    {searchedExam.status === "active"
      ? "Start Exam"
      : "Not Available"}
  </button>
</div>
        </div>
      )}

      {/* 👨‍🏫 TEACHER / ADMIN LIST (UNCHANGED) */}
      {(userRole === "admin" || userRole === "teacher") && (
        <div className="exam-cards-container">
          {visibleExams.length === 0 ? (
            <div style={{ textAlign: "center", width: "100%", color: "#888" }}>
              No exams found.
            </div>
          ) : (
            visibleExams.map((exam) => (
              <div className="exam-card" key={exam.exam_id}>
                <div className="exam-content">
                  <h2 className="exam-name">{exam.exam_title}</h2>
                  <p className="subject">{exam.subject}</p>
                </div>

                <div className="action-buttons">
                  <button onClick={() => handleEdit(exam)}>Edit</button>

                  <button onClick={() => handleDelete(exam.exam_id)}>
                    {loadingId === exam.exam_id ? "Deleting..." : "Delete"}
                  </button>

                  <button onClick={() => handleView(exam)}>View</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PAGINATION */}
      {userRole === "teacher" && totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamList;