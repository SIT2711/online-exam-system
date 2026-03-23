// pages/editprofile.jsx
import React, { useState } from 'react';
import '../styles/EditProfile.css'; // Ensure correct CSS is imported

const EditProfile = () => {
  const [fullName, setFullName] = useState('Amar Patil');
  const [phone, setPhone] = useState('9876543210');

  const handleUpdate = () => {
    alert('Profile updated!');
    // Logic to update profile (can be connected to backend later)
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

          <button type="button" onClick={handleUpdate}>Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;