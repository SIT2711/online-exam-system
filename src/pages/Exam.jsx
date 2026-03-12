import React, { useState } from "react";
import "./Exam.css";

function Exam() {

  const questions = [
    {
      question: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A database",
        "A programming language",
        "An operating system"
      ]
    },
    {
      question: "Which company developed React?",
      options: [
        "Google",
        "Facebook",
        "Microsoft",
        "Amazon"
      ]
    },
    {
      question: "Which hook is used to manage state in React functional components?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ]
    },
    {
      question: "What file is commonly used as the main component in React apps?",
      options: [
        "App.js",
        "index.html",
        "server.js",
        "style.css"
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="exam-container">
      <div className="exam-box">

        <h2 className="exam-title">React Exam</h2>

        <p className="question">
          Question {currentQuestion + 1}: {questions[currentQuestion].question}
        </p>

        {questions[currentQuestion].options.map((option, index) => (
          <div className="option" key={index}>
            <label>
              <input type="radio" name="option" /> {option}
            </label>
          </div>
        ))}

        <div className="buttons">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default Exam;