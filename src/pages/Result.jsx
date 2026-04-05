import React, { useEffect, useState } from "react";
import "../styles/Result.css";

const Result = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;
  const role = user?.role;

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 5;

  // ✅ FETCH DATA BASED ON ROLE
  useEffect(() => {
    if (!userId) return;

    const storedData = JSON.parse(localStorage.getItem("user"));
    const role = storedData?.role;

    let url = "";

    if (role === "admin" || role === "teacher") {
      url = "http://localhost/online-exam-system/attempt/get_all_results.php";
    } else {
      url = `http://localhost/online-exam-system/attempt/get_result.php?user_id=${userId}`;
    }

    console.log("API URL:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        if (data.status === "success" && Array.isArray(data.data)) {
          setResults(data.data);
        } else {
          setResults([]);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, [userId]);

  // ✅ SEARCH FILTER
  const filteredResults = results.filter((item) =>
    (item.student_name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.exam_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ PAGINATION
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  // ✅ SCORE COLOR FUNCTION
  const getScoreColor = (score) => {
    if (score > 80) return "green";
    if (score < 40) return "red";
    return "black";
  };

  return (
    <div className="result-page">
      <div style={{ width: "100%", maxWidth: "900px" }}>

        <h2 className="result-title">Results</h2>

        {/* ✅ SEARCH */}
        <input
          type="text"
          placeholder="Search by student or exam..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        {/* ✅ ADMIN / TEACHER TABLE */}
        {(role === "admin" || role === "teacher") && (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Exam Name</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.student_name}</td>
                  <td>{item.exam_name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.correct_answers}</td>
                  <td style={{ color: getScoreColor(item.score) }}>
                    {item.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ✅ STUDENT CARD UI */}
        {role === "student" && (
          <div className="card-container">
            {currentResults.map((item, index) => (
              <div className="result-card" key={index}>
                <h3>{item.exam_name}</h3>
                <p>Total Questions: {item.total_questions}</p>
                <p>Correct Answers: {item.correct_answers}</p>
                <h3 style={{ color: getScoreColor(item.score) }}>
                  Score: {item.score}%
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* ✅ PAGINATION */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            ⬅️ Previous
          </button>

          <span style={{ margin: "0 15px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;