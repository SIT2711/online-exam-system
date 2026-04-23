// pages/Profile.jsx
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

  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    // ✅ FIX: normalize id → user_id
    const user_id = storedUser.user_id || storedUser.id;

    // ================= PROFILE =================
    fetch('http://localhost/online-exam-system/auth/profile.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          navigate("/login");
        }
      });

    // ================= STATS =================
    let url = "";

    if (storedUser.role === "student") {
      url = "http://localhost/online-exam-system/stats/student_stats.php";
    } else if (storedUser.role === "teacher") {
      url = "http://localhost/online-exam-system/stats/teacher_stats.php";
    } else {
      url = "http://localhost/online-exam-system/stats/admin_stats.php";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setStats(data);
        }
      });

  }, [navigate]);

  const handleUpdateProfile = () => {
    navigate('/editprofile');
  };

  const handleGoBack = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const role = storedUser.role;

    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "teacher") navigate("/teacher-dashboard");
    else navigate("/student-dashboard");
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

          {user.role === "student" && (
            <>
              <div className="stat-card">
                <p>Total Exams Attempted: {stats.total_attempted || 0}</p>
              </div>
              <div className="stat-card">
                <p>Completed Exams: {stats.completed || 0}</p>
              </div>
              <div className="stat-card">
                <p>Last Score: {parseFloat(stats.last_percentage || 0).toFixed(0)}%</p>
              </div>
            </>
          )}

          {user.role === "teacher" && (
            <>
              <div className="stat-card">
                <p>Total Exams Created: {stats.total_exams || 0}</p>
              </div>
              <div className="stat-card">
                <p>Total Students Evaluated: {stats.total_students || 0}</p>
              </div>
              <div className="stat-card">
                <p>Average Student Percentage: {parseFloat(stats.avg_percentage || stats.avg_score || 0).toFixed(0)}%</p>
              </div>
            </>
          )}

          {user.role === "admin" && (
            <>
              <div className="stat-card">
                <p>Total Users: {stats.total_users || 0}</p>
              </div>
              <div className="stat-card">
                <p>Total Exams Created: {stats.total_exams || 0}</p>
              </div>
              <div className="stat-card">
                <p>Total Completed Exams: {stats.completed_exams || 0}</p>
              </div>
            </>
          )}

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