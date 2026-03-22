// pages/profile.jsx
import React, { useState } from 'react';
import '../styles/Profile.css'; // Ensure the correct CSS file is imported

const Profile = () => {
  const [showStatistics, setShowStatistics] = useState(false);

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  return (
    <div className="profile-container">
      {/* Profile Info Card */}
      <div className="card profile-info-card">
        <h2>Profile Information</h2>
        <div className="profile-info">
          <p><strong>Full Name:</strong> Amar Patil</p>
          <p><strong>Email:</strong> Amar@gmail.com</p>
          <p><strong>Phone:</strong> 9876543210</p>
          <p><strong>Role:</strong> Student</p>
          <p><strong>Joined Date:</strong> 22 March 2026</p>
        </div>
      </div>

      {/* Button to toggle statistics */}
      <button
        className="view-statistics-btn"
        onClick={toggleStatistics}
      >
        {showStatistics ? 'Hide Statistics' : 'View Statistics'}
      </button>

      {/* Statistics Card */}
      {showStatistics && (
        <div className="card statistics-card">
          <h3>Statistics</h3>
          <div className="stat-card">
            <p><strong>Total Exams Attempted:</strong> 5</p>
          </div>
          <div className="stat-card">
            <p><strong>Completed Exams:</strong> 3</p>
          </div>
          <div className="stat-card">
            <p><strong>Last Score:</strong> 80%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;