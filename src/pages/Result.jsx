import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const { answers = {}, questions = [], name } = state || {};

  const total = questions.length;
  let correct = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correct) correct++;
  });

  const percent = ((correct / total) * 100).toFixed(2);

  useEffect(() => {
    const prev = JSON.parse(localStorage.getItem("history")) || [];

    const newData = {
      name,
      exam: "Java Test",
      score: `${correct}/${total}`,
      percent: `${percent}%`,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem("history", JSON.stringify([...prev, newData]));
  }, []);

  return (
    <div className="card">
      <h2>Result</h2>

      <p>Student: {name}</p>
      <p>Score: {correct}/{total}</p>
      <p>Percentage: {percent}%</p>
    </div>
  );
};

export default Result;