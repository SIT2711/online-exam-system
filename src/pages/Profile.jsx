// pages/profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: '',
    join_date: ''
  });

  const navigate = useNavigate();

  // FETCH DATA
  useEffect(() => {
    fetch('http://localhost/online-exam-system/auth/profile.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdateProfile = () => {
    navigate('/editprofile');
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">

      {/* TOP SECTION (2 CARDS) */}
      <div className="top-section">

        {/* PROFILE CARD */}
        <div className="card">
          <h2>PROFILE INFORMATION</h2>

          <div className="profile-info">
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined Date:</strong> {user.join_date}</p>
          </div>
        </div>

        {/* STATISTICS CARD */}
        <div className="card">
          <h3>STATISTICS</h3>

          <div className="stat-card">
            <p>Total Exams Attempted: 5</p>
          </div>

          <div className="stat-card">
            <p>Completed Exams: 3</p>
          </div>

          <div className="stat-card">
            <p>Last Score: 80%</p>
          </div>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-buttons">
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>

    </div>
  );
};

export default Profile;