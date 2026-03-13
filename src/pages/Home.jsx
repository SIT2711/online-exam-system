import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Online Exam System</h1>
      <p>Select a page</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={btn}>Login</button>
        </Link>

        <Link to="/exams">
          <button style={btn}>Exam List</button>
        </Link>

        <Link to="/exam">
          <button style={btn}>Start Exam</button>
        </Link>

        <Link to="/addquestion">
          <button style={btn}>Add Question</button>
        </Link>
      </div>
    </div>
  );
}

const btn = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer"
};

export default Home;