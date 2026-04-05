import React, { useEffect, useState } from "react";
import "../styles/ResultHistory.css";

function ResultHistory() {
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ GET USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    console.log("LOCALSTORAGE DATA:", JSON.stringify(storedData, null, 2));

    const id =
      storedData?.id ||
      storedData?.user_id ||
      storedData?.user?.user_id;

    const userRole = storedData?.role || "student";

    setUserId(id);
    setRole(userRole);
  }, []);

  // ✅ FETCH DATA FROM API
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost/online-exam-system/attempt/get_result.php?user_id=${userId}&role=${role}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);
        if (data.status === "success" && Array.isArray(data.data)) {
          setResults(data.data);
        } else {
          setResults([]);
          setError(data.message || "No results found");
        }
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setResults([]);
        setError("Failed to load results");
      })
      .finally(() => setLoading(false));
  }, [userId, role]);

  return (
    <div className="result-history-container">
      <h2>Result History</h2>

      <div className="result-card">
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {error}
                </td>
              </tr>
            ) : results.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Results Found
                </td>
              </tr>
            ) : (
              results.map((result, index) => (
                <tr key={index}>
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