import React, { useEffect, useState } from "react";
import "../styles/ResultHistory.css";

function ResultHistory() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ✅ Dynamic column count
  const columnCount =
    role === "admin" ? 6 : role === "teacher" ? 5 : 4;

  // ✅ Get user from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));

    const id =
      storedData?.id ||
      storedData?.user_id ||
      storedData?.user?.user_id;

    setUserId(id);
    setRole(storedData?.role || "student");
  }, []);

  // ✅ Fetch data
  useEffect(() => {
    if (!userId) return;

    fetch(
      `http://localhost/online-exam-system/attempt/get_result.php?user_id=${userId}&role=${role}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setResults(data.data);
          setFilteredResults(data.data);
        } else {
          setResults([]);
          setFilteredResults([]);
        }
      })
      .catch(() => {
        setResults([]);
        setFilteredResults([]);
      })
      .finally(() => setLoading(false));
  }, [userId, role]);

  // ✅ Search filter
  useEffect(() => {
    const filtered = results.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.exam_name?.toLowerCase().includes(text) ||
        item.student_name?.toLowerCase().includes(text) ||
        item.teacher_name?.toLowerCase().includes(text)
      );
    });

    setFilteredResults(filtered);
  }, [search, results]);

  // ✅ Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ✅ Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredResults.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  return (
    <div className="result-history-container">
      <h2 className="title">RESULT HISTORY</h2>

      {/* 🔍 SEARCH BAR */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by student, teacher, or exam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 📦 TABLE CARD */}
      <div className={`result-card ${role}`}>
        <table>
          <thead>
            <tr>
              {(role === "admin" || role === "teacher") && (
                <th>Student Name</th>
              )}
              {role === "admin" && <th>Teacher Name</th>}
              <th>Exam Name</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columnCount}>Loading...</td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan={columnCount}>No Results Found</td>
              </tr>
            ) : (
              currentRows.map((result, index) => (
                <tr key={index}>
                  {(role === "admin" || role === "teacher") && (
                    <td>{result.student_name}</td>
                  )}

                  {role === "admin" && (
                    <td>{result.teacher_name}</td>
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

        {/* 🔢 PAGINATION */}
        <div className="pagination">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultHistory;