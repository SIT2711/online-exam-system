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
    fetch('http://localhost/online-exam-system/auth/profile.php', {
      method: "GET",
      credentials: "include"
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

    try {
      const res = await fetch('http://localhost/online-exam-system/auth/profile.php', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          phone: phone
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Profile updated successfully");
        navigate("/profile"); // go back after update
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
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
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