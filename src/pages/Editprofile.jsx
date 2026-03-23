// pages/editProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css'; // Ensure correct CSS is imported

const EditProfile = () => {
  const [fullName, setFullName] = useState('Amar Patil');
  const [phone, setPhone] = useState('9876543210');
  const navigate = useNavigate();

  const handleUpdate = () => {
    alert('Profile updated!');
    // Logic to update profile (can be connected to backend later)
  };

  const handleGoBack = () => {
    navigate('/profile'); // Navigate back to the dashboard
  };

  return (
    <div className="edit-profile-container">
      {/* Edit Profile Card */}
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Button Container for Update and Go Back buttons */}
          <div className="button-container">
            <button type="button" onClick={handleUpdate}>Update Profile</button>
            <button className="go-back-btn" type="button" onClick={handleGoBack}>Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;