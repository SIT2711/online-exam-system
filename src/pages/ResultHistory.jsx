import React, { useEffect, useState } from "react";
import "../styles/ResultHistory.css";

function ResultHistory() {
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(true);

  // ✅ GET USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));

    const id =
      storedData?.id ||
      storedData?.user_id ||
      storedData?.user?.user_id;

    const userRole = storedData?.role || "student";

    setUserId(id);
    setRole(userRole);
  }, []);

  // ✅ FETCH DATA
  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    fetch(`http://localhost/online-exam-system/attempt/get_result.php?user_id=${userId}&role=${role}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setResults(data.data);
        } else {
          setResults([]);
        }
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [userId, role]);

  return (
    <div className="result-history-container">
      <h2>Result History</h2>

      <div className="result-card">
        <table>
          <thead>
            <tr>
              {/* ✅ SHOW STUDENT NAME ONLY FOR ADMIN/TEACHER */}
              {(role === "admin" || role === "teacher") && (
                <th>Student Name</th>
              )}
              <th>Exam Name</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : results.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Results Found
                </td>
              </tr>
            ) : (
              results.map((result, index) => (
                <tr key={index}>
                  
                  {/* ✅ SHOW NAME ONLY FOR ADMIN/TEACHER */}
                  {(role === "admin" || role === "teacher") && (
                    <td>{result.student_name}</td>
                  )}

                  <td>{result.exam_name}</td>

                  <td>
                    {result.correct_answers}/{result.total_questions}
                  </td>

                  <td
                    style={{
                      color:
                        result.score > 80
                          ? "green"
                          : result.score < 40
                          ? "red"
                          : "black",
                    }}
                  >
                    {parseFloat(result.score).toFixed(0)}%
                  </td>

                  <td>
                    {new Date(result.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultHistory;