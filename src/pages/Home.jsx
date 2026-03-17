import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    localStorage.setItem("username", name);
    navigate("/exam", { state: { name } });
  };

  return (
    <div className="card">
      <h2>Welcome to Exam System</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn" onClick={handleStart}>
        Start Exam
      </button>

      <br /><br />

      <button className="btn" onClick={() => navigate("/history")}>
        View History
      </button>
    </div>
  );
};

export default Home;