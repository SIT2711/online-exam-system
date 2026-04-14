import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ExamList.css";

const ExamList = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [examList, setExamList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedExam, setSearchedExam] = useState(null);
  const [starting, setStarting] = useState(false);

  const userRole = user?.role;
  const userId = user?.id;

  // LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // FETCH EXAMS
  useEffect(() => {
    if (!user || userRole === "student") return;

    fetch("http://localhost/online-exam-system/exam/get_exams.php")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          let exams = data.data || [];

          if (userRole === "teacher") {
            exams = exams.filter(
              (exam) => String(exam.teacher_id) === String(userId)
            );
          }

          setExamList(exams);
        } else {
          setExamList([]);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setExamList([]);
      });
  }, [user, userRole, userId]);

  // SAFE JSON FETCH (🔥 IMPORTANT FIX)
  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("INVALID JSON RESPONSE:", text);
      return null;
    }
  };

  // START EXAM
  const handleStartExam = async (exam_id) => {
    if (starting) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.id) {
      alert("User not found. Please login again.");
      return;
    }

    setStarting(true);

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/attempt/start_exam.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exam_id: Number(exam_id),
            student_id: Number(storedUser.id),
          }),
        }
      );

      const data = await safeJson(res);

      if (!data) {
        alert("Server error (invalid response)");
        return;
      }

      console.log("START EXAM RESPONSE:", data);

      if (data.status === "success" || data.status === "exists") {
        navigate(`/attemptexam/${exam_id}`);
      } else {
        alert(data.message || "Cannot start exam");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while starting exam");
    } finally {
      setStarting(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

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

      const data = await safeJson(res);

      if (data?.status === "success") {
        setExamList((prev) => prev.filter((e) => e.exam_id !== id));
      } else {
        alert(data?.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoadingId(null);
    }
  };

  // SEARCH
  const handleSearch = async () => {
    if (!searchTerm.trim()) return alert("Enter exam code");

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/exam/get_exam_by_code.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exam_code: searchTerm.trim() }),
        }
      );

      const data = await safeJson(res);

      if (data?.status === "success") {
        setSearchedExam(data.data);
      } else {
        setSearchedExam(null);
        alert(data?.message || "Not found");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // EDIT
  const handleEdit = (exam) => {
    navigate(`/edit-exam/${exam.exam_id}`, { state: exam });
  };

  // VIEW
  const handleView = (exam) => {
    navigate(`/viewExam/${exam.exam_id}`);
  };

  return (
    <div className="exam-list-container">

      <div className="top-bar">
        {userRole !== "student" && <h1>Available Exams</h1>}

        {(userRole === "admin" || userRole === "teacher") && (
          <button onClick={() => navigate("/exam")}>
            + Create Exam
          </button>
        )}
      </div>

      {/* SEARCH */}
      {userRole === "student" && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter exam code"
            style={{
              padding: "10px",
              flex: 1,
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* CARDS */}
      <div className="exam-cards-container">

        {userRole === "student" ? (
          searchedExam ? (
            <div className="exam-card">
              <h2>{searchedExam.exam_title}</h2>
              <p>{searchedExam.subject}</p>
              <p>{searchedExam.duration} min</p>

              <button
                onClick={() => handleStartExam(searchedExam.exam_id)}
                disabled={starting}
              >
                {starting ? "Starting..." : "Start Exam"}
              </button>
            </div>
          ) : (
            <p>Search exam code to start exam</p>
          )
        ) : (
          examList.map((exam) => (
            <div key={exam.exam_id} className="exam-card">

              <h2>{exam.exam_title}</h2>
              <p>{exam.subject}</p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>

                <button onClick={() => handleEdit(exam)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(exam.exam_id)}
                  disabled={loadingId === exam.exam_id}
                >
                  {loadingId === exam.exam_id ? "Deleting..." : "Delete"}
                </button>

                <button onClick={() => handleView(exam)}>
                  View
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamList;