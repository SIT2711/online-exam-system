import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ExamTimer = () => {
  const [time, setTime] = useState(45 * 60);
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || localStorage.getItem("username");

  const questions = [
    {
      id: 1,
      question: "What is JVM in Java?",
      options: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Machine", "None"],
      correct: "Java Virtual Machine",
    },
    {
      id: 2,
      question: "Which keyword is used for inheritance?",
      options: ["this", "super", "extends", "implements"],
      correct: "extends",
    },
    {
      id: 3,
      question: "Which method is entry point in Java?",
      options: ["start()", "main()", "run()", "init()"],
      correct: "main()",
    },
  ];

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate("/submit", { state: { answers, questions, name } });
    }
  }, [time]);

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = () => {
    navigate("/submit", { state: { answers, questions, name } });
  };

  return (
    <div className="card">
      <h2>{name}'s Exam</h2>
      <h1>{formatTime()}</h1>

      <hr />

      {questions.map((q) => (
        <div key={q.id}>
          <p><b>{q.question}</b></p>

          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name={`q${q.id}`}
                checked={answers[q.id] === opt}
                onChange={() => setAnswers({ ...answers, [q.id]: opt })}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <br />
      <button className="btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExamTimer;