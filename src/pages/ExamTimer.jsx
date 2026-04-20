import React, { useEffect, useState } from "react";

function ExamTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(0);

  // ✅ reset when duration changes
  useEffect(() => {
    if (duration > 0) {
      setTimeLeft(duration * 60);
    }
  }, [duration]);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <h3 style={{ color: timeLeft < 300 ? "red" : "green" }}>
      Time Left: {min}:{sec < 10 ? "0" : ""}{sec}
    </h3>
  );
}

export default ExamTimer;