import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ExamList.css";

const ExamList = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userRole = (user?.role || "").toLowerCase();
  const userId = user?.id || user?.user_id;

  const [examList, setExamList] = useState([]);
  const [examCode, setExamCode] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= TEACHER / ADMIN FETCH =================
  useEffect(() => {
    if (userRole === "student") return;

    fetch("http://localhost/online-exam-system/exam/get_exams.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          let exams = data.data || [];

          if (userRole === "teacher") {
            exams = exams.filter(
              (e) => String(e.teacher_id) === String(userId)
            );
          }

          setExamList(exams);
        }
      })
      .catch((err) => console.log(err));
  }, [userRole, userId]);

  // ================= STUDENT SEARCH =================
  const handleSearch = async () => {
    if (!examCode.trim()) {
      alert("Please enter exam code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/exam/getExamByCode.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exam_code: examCode }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        const exam = data.data;

        const now = new Date();
        const start = new Date(exam.start_date);
        const end = new Date(exam.end_date);

        // ⏳ NOT STARTED
        if (now < start) {
          alert("Exam has not started yet");
          setExamList([]);
          setLoading(false);
          return;
        }

        // ⛔ TIME OVER (FIXED POSITION)
        if (now > end) {
          alert("Exam time is over");
          setExamList([]);
          setLoading(false);
          return;
        }

        // ✅ CHECK ATTEMPT AFTER TIME CHECK
        const formData = new FormData();
        formData.append("exam_id", exam.exam_id);
        formData.append("student_id", userId);

        const res2 = await fetch(
          "http://localhost/online-exam-system/attempt/check_attempt.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const attemptData = await res2.json();

        if (attemptData.status === "completed") {
          alert("You have already completed this exam");
          setExamList([]);
          setLoading(false);
          return;
        }

        // ✅ ALLOW EXAM
        setExamList([exam]);

      } else {
        setExamList([]);
        alert("No exam found");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // ================= START EXAM =================
  const handleView = async (exam) => {
    if (userRole === "student") {
      try {
        const formData = new FormData();
        formData.append("exam_id", exam.exam_id);
        formData.append("student_id", userId);

        const res = await fetch(
          "http://localhost/online-exam-system/attempt/start_exam.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        // ❌ BLOCK IF COMPLETED
        if (data.status === "completed") {
          alert("You have already completed this exam");
          return;
        }

        // ✅ START / CONTINUE
        navigate(`/attempt-exam/${exam.exam_id}`);

      } catch (err) {
        alert("Error starting exam");
      }
    } else {
      navigate(`/viewExam/${exam.exam_id}`);
    }
  };

  if (!userRole) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>User not found. Please login again.</h2>
      </div>
    );
  }

  return (
    <div className="exam-list-container">

      <div className="top-bar">
        <h1 className="page-title">Available Exams</h1>

        {(userRole === "teacher" || userRole === "admin") && (
          <button
            className="create-exam-btn"
            onClick={() => navigate("/exam")}
          >
            + Create Exam
          </button>
        )}
      </div>

      {/* ================= STUDENT VIEW ================= */}
      {userRole === "student" ? (
        <div style={{ textAlign: "center", marginTop: "5px" }}>

          <h2>Enter Exam Code</h2>

          <input
            type="text"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            placeholder="Enter exam code"
            style={{ padding: "10px", marginTop: "10px" }}
          />

          <br />

          <button
            className="start-exam-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Exam"}
          </button>

          <div className="exam-cards-container">

            {examList.length === 0 ? (
              <p style={{ marginTop: "20px" }}>No exam found</p>
            ) : (
              examList.map((exam) => (
                <div className="exam-card" key={exam.exam_id}>

                  <div className="exam-content">
                    <h2>{exam.exam_title}</h2>
                    <p>{exam.subject}</p>
                    <p>{exam.duration} minutes</p>
                  </div>

                  <div className="action-buttons">
                    <button onClick={() => handleView(exam)}>
                      Start Exam
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>
        </div>
      ) : (
        <div className="exam-cards-container">

          {examList.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              No exams found
            </p>
          ) : (
            examList.map((exam) => (
              <div className="exam-card" key={exam.exam_id}>

                <div className="exam-content">
                  <h2>{exam.exam_title}</h2>
                  <p>{exam.subject}</p>
                  <p>{exam.duration} minutes</p>
                </div>

                <div className="action-buttons">
                  <button onClick={() => handleView(exam)}>
                    View
                  </button>
                </div>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default ExamList;