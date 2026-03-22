import React, { useState, useEffect } from "react";
import "../styles/ExamTimer.css";

function ExamTimer() {

  // 45 minutes = 2700 seconds
  const [timeLeft, setTimeLeft] = useState(2700);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prevTime) => {

        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Time is up! Exam will be submitted.");
          return 0;
        }

        return prevTime - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-page">

      <div className="timer-card">

        <h2 className="timer-title">Time Remaining</h2>

        <div
          className="timer-time"
          style={{ color: timeLeft < 300 ? "red" : "#0d6efd" }}
        >
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>

      </div>

    </div>
  );
}

export default ExamTimer;