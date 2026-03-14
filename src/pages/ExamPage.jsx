import React, { useState } from "react";
import "../styles/ExamPage.css";

function ExamPage() {

  const questions = [
    {
      question: "What is the unit of Force?",
      options: ["Newton", "Joule", "Pascal", "Watt"]
    },
    {
      question: "Which element has the chemical symbol O?",
      options: ["Oxygen", "Gold", "Iron", "Silver"]
    },
    {
      question: "What is the value of π (pi)?",
      options: ["3.14", "2.71", "1.61", "4.12"]
    },
    {
      question: "Who is known as the father of Computer?",
      options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"]
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption("");
    }
  };

  const handleSubmit = () => {
    alert("Exam Submitted Successfully!");
  };

  return (
    <div className="examPage-container">

      <div className="examPage-card">

        <h2>Online Exam</h2>

        <p>
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <h3>
          {questions[currentQuestion].question}
        </h3>

        <div className="examPage-options">
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="examPage-option">

              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />

              <span>{option}</span>

            </label>
          ))}
        </div>

        <div className="examPage-buttons">

          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button onClick={nextQuestion}>
              Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ExamPage;