import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RegistrationForm.css';

const sportsByGroup = {
  'A': { 'Male': ['A1 - Kids Football', 'A2 - Sprint 50m'], 'Female': ['A1 - Kids Football', 'A2 - Musical Chairs'] },
  'B': { 'Male': ['B1 - Cricket', 'B2 - Football'], 'Female': ['B3 - Badminton', 'B4 - Throwball'] },
  'C': { 'Male': ['C1 - Pro Football', 'C2 - Volleyball'], 'Female': ['C1 - Pro Football', 'C3 - Athletics'] },
  'D': { 'Male': ['D1 - Veterans Cricket', 'D2 - Carrom'], 'Female': ['D2 - Carrom', 'D3 - Chess'] },
  'E': { 'Male': ['E1 - Walking Race', 'E2 - Yoga'], 'Female': ['E E1 - Walking Race', 'E2 - Yoga'] },
  'F': { 'Male': ['F1 - Musical Chairs', 'F2 - Bridge'], 'Female': ['F1 - Musical Chairs', 'F2 - Bridge'] }
};

const RegistrationForm = ({ group, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    tower: '',
    flatNo: '',
    phoneNo: '',
    gender: '',
    residentialStatus: '',
    selectedSports: [] 
  });

  // Handles adding/removing sports with a limit of 2
  const handleSportChange = (sport) => {
    setFormData(prev => {
      const current = prev.selectedSports || [];
      if (current.includes(sport)) {
        return { ...prev, selectedSports: current.filter(s => s !== sport) };
      } 
      if (current.length < 2) {
        return { ...prev, selectedSports: [...current, sport] };
      }
      alert("Maximum 2 sports allowed!");
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.selectedSports.length === 0) {
      alert("Please select at least one sport.");
      return;
    }

    try {
      const payload = {
        ...formData,
        ageGroup: `Group ${group}`
      };

      // Ensure this URL matches your backend (local or deployed)
      const response = await fetch('https://solaris-backend-s1jz.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Registration Successful!");
        onBack(); 
      } else {
        alert("❌ Error: " + result.error);
      }
    } catch (err) {
      alert("❌ Server Error. Please check if the backend is awake.");
    }
  };

  return (
    <div className="registration-body">
      <div className="glow-box">
        <motion.button onClick={onBack} className="back-btn">← BACK</motion.button>
        <h2>SOLARIS BONHOOGHLY PHASE 1</h2>
        <h1>GROUP {group} REGISTRATION</h1>
        <p className="subtitle">Annual Sports 2026 - SAC Committee</p>

        <form onSubmit={handleSubmit}>
          {/* Personal Info Section */}
          <div className="input-group">
            <input type="text" required placeholder=" " value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})} />
            <label>Full Name</label>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.tower} onChange={e => setFormData({...formData, tower: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="I">I</option>
                <option value="II">II</option>
              </select>
              <label>Tower</label>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <input type="text" required placeholder=" " value={formData.flatNo}
                onChange={e => setFormData({...formData, flatNo: e.target.value})} />
              <label>Flat No</label>
            </div>
          </div>

          <div className="input-group">
            <input type="tel" required placeholder=" " value={formData.phoneNo}
              onChange={e => setFormData({...formData, phoneNo: e.target.value})} />
            <label>Phone Number</label>
          </div>

          {/* Gender & Status Section */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value, selectedSports: []})}>
                <option value="" disabled hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Gender</label>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.residentialStatus} 
                onChange={e => setFormData({...formData, residentialStatus: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
              <label>Status</label>
            </div>
          </div>

          {/* Dynamic Checkbox Section */}
          <div className="input-group">
            <label className="section-label">Select {group} Sports (Max 2):</label>
            {formData.gender ? (
              <div className="checkbox-container">
                {sportsByGroup[group][formData.gender].map(sport => (
                  <label key={sport} className="checkbox-label">
                    <input type="checkbox" 
                      checked={formData.selectedSports.includes(sport)}
                      onChange={() => handleSportChange(sport)} 
                    />
                    <span>{sport}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="helper-text">Please select Gender first to see available sports.</p>
            )}
          </div>

          <button type="submit" className="confirm-btn">CONFIRM REGISTRATION</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;