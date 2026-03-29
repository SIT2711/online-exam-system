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

  // ================= FETCH PROFILE =================
  useEffect(() => {
    fetch('http://localhost/online-exam-system/auth/profile.php', {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          console.log(data.message);
          navigate("/login");
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);


  const handleUpdateProfile = async () => {
    navigate('/EditProfile');
   
  };


  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">

      <div className="top-section">

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

      <div className="profile-buttons">
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>

    </div>
  );
};

export default Profile;