// pages/profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import '../styles/Profile.css';

const Profile = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between pages

  // Toggle statistics visibility
  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  // Navigate to EditProfile page when "Update Profile" button is clicked
  const handleUpdateProfile = () => {
    navigate('/Editprofile');
  };

  // Navigate to Dashboard page when "Go Back" button is clicked
  const handleGoBack = () => {
    navigate('/dashboard');
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
      <button className="view-statistics-btn" onClick={toggleStatistics}>
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

      {/* Buttons for Update Profile and Go Back */}
      <div className="profile-buttons">
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button className="go-back-btn" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Profile;