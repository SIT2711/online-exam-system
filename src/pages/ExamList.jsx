import React from 'react';      
import '../styles/ExamList.css'; // Importing the CSS for the ExamList

const exams = [
  {
    examName: 'Mathematics Final Exam',
    subject: 'Mathematics',
    duration: '2 hours',
  },
  {
    examName: 'Physics Midterm Exam',
    subject: 'Physics',
    duration: '1.5 hours',
  },
  {
    examName: 'Computer Science Final Exam',
    subject: 'Computer Science',
    duration: '3 hours',
  },
  // Add more exams as needed
];

const ExamList = () => {
  const handleStartExam = (examName) => {
    alert(`Starting exam: ${examName}`);
  };

  return (
    <div className="exam-list-container">
      <h1 className="page-title">Available Exams</h1>
      <div className="exam-cards-container">
        {exams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <h2 className="exam-name">{exam.examName}</h2>
            <p className="subject">{exam.subject}</p>
            <p className="duration">{exam.duration}</p>
            <button
              className="start-exam-btn"
              onClick={() => handleStartExam(exam.examName)}
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;