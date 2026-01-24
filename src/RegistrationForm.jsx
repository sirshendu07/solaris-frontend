import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RegistrationForm.css';

const sportsByGroup = {
  'A': {
    'Male': ['A1 - Kids Football', 'A2 - Sprint 50m'],
    'Female': ['A1 - Kids Football', 'A2 - Musical Chairs']
  },
  'B': {
    'Male': ['B1 - Cricket', 'B2 - Football'],
    'Female': ['B3 - Badminton', 'B4 - Throwball']
  },
  'C': {
    'Male': ['C1 - Pro Football', 'C2 - Volleyball'],
    'Female': ['C1 - Pro Football', 'C3 - Athletics']
  },
  'D': {
    'Male': ['D1 - Veterans Cricket', 'D2 - Carrom'],
    'Female': ['D2 - Carrom', 'D3 - Chess']
  },
  'E': {
    'Male': ['E1 - Walking Race', 'E2 - Yoga'],
    'Female': ['E1 - Walking Race', 'E2 - Yoga']
  },
  'F': {
    'Male': ['F1 - Musical Chairs', 'F2 - Bridge'],
    'Female': ['F1 - Musical Chairs', 'F2 - Bridge']
  }
};

const RegistrationForm = ({ group, onBack }) => {
  const availableSports = sportsByGroup[group] || [];
  const [formData, setFormData] = useState({
    fullName: '',
    tower: '',
    flatNo: '',
    phoneNo: '',
    gender: '',
    residentialStatus: '',
    selectedSport: ''
  });

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // We create a new object that includes the 'ageGroup' required by your backend
      const payload = {
        ...formData,
        ageGroup: `Group ${group}` // This matches 'Group A', 'Group B', etc.
      };

      const response = await fetch('https://solaris-backend-s1jz.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) // 👈 Send the updated payload here
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Registration Successful!");
        onBack(); 
      } else {
        alert("❌ Error: " + result.error);
      }
    } catch (err) {
      alert("❌ Server Error. Please check if your Node backend is running.");
    }
  };

  return (
    <div className="registration-body">
      <div className="glow-box">
        <motion.button onClick={onBack} style={{ background: 'none', border: 'none', color: '#00ffd5', cursor: 'pointer', marginBottom: '15px' }}>
          ← BACK
        </motion.button>
        
        <h2>SOLARIS BONHOOGHLY PHASE 1</h2>
        <h1>GROUP {group} REGISTRATION</h1>
        <p className="subtitle">Annual Sports 2026 - SAC Committee</p>

        <form onSubmit={handleSubmit}>
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

          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label>Gender</label>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.residentialStatus} onChange={e => setFormData({...formData, residentialStatus: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
              <label>Status</label>
            </div>
          </div>

          <div className="input-group">
            <select required value={formData.selectedSport} onChange={e => setFormData({...formData, selectedSport: e.target.value})}>
              <option value="" disabled hidden></option>
              {availableSports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label>Select {group} Sport</label>
          </div>

          <button type="submit" className="confirm-btn">CONFIRM REGISTRATION</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;