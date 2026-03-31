// pages/editProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = () => {

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  // ================= FETCH USER DATA =================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetch('http://localhost/online-exam-system/auth/profile.php', {
      method: "POST",   // ✅ FIXED
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: storedUser.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setFullName(data.user.full_name);
          setPhone(data.user.phone);
          setEmail(data.user.email);
        } else {
          navigate("/login");
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {

    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    try {
      const res = await fetch('http://localhost/online-exam-system/auth/profile.php', {
        method: "POST",   // ✅ keep POST
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "update",   // ✅ IMPORTANT
          user_id: storedUser.id,   // ✅ IMPORTANT
          full_name: fullName,
          email: email,
          phone: phone
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Profile updated successfully");
        navigate("/profile");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleGoBack = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      
      <div className="card">
        <h2>Edit Profile</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button type="button" onClick={handleUpdate}>
              Update Profile
            </button>

            <button
              className="go-back-btn"
              type="button"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default EditProfile;