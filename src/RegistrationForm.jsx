import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RegistrationForm.css';

const sportsByGroup = {
  'A': { 'Male': ['A1 - Kids Football', 'A2 - Sprint 50m'], 'Female': ['A1 - Kids Football', 'A2 - Musical Chairs'] },
  'B': { 'Male': ['B1 - Cricket', 'B2 - Football'], 'Female': ['B3 - Badminton', 'B4 - Throwball'] },
  'C': { 'Male': ['C1 - Pro Football', 'C2 - Volleyball'], 'Female': ['C1 - Pro Football', 'C3 - Athletics'] },
  'D': { 'Male': ['D1 - Veterans Cricket', 'D2 - Carrom'], 'Female': ['D2 - Carrom', 'D3 - Chess'] },
  'E': { 'Male': ['E1 - Walking Race', 'E2 - Yoga'], 'Female': ['E1 - Walking Race', 'E2 - Yoga'] },
  'F': { 'Male': ['F1 - Musical Chairs', 'F2 - Bridge'], 'Female': ['F1 - Musical Chairs', 'F2 - Bridge'] }
};

const RegistrationForm = ({ group, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '', tower: '', flatNo: '', phoneNo: '', gender: '', residentialStatus: '',
    selectedSports: [] 
  });

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
      const payload = { ...formData, ageGroup: `Group ${group}` };
      const response = await fetch('https://solaris-backend-s1jz.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert("✅ Registration Successful!");
        onBack(); 
      } else {
        const result = await response.json();
        alert("❌ Error: " + result.error);
      }
    } catch (err) {
      alert("❌ Server Error. Please check your internet.");
    }
  };

  return (
    <div className="registration-body">
      <div className="glow-box">
        <motion.button onClick={onBack} className="back-btn" style={{ background: 'none', border: 'none', color: '#00ffd5', cursor: 'pointer', marginBottom: '15px' }}>
          ← BACK
        </motion.button>
        
        <h2>SOLARIS BONHOOGHLY PHASE 1</h2>
        <h1>GROUP {group} REGISTRATION</h1>
        <p className="subtitle">Annual Sports 2026 - SAC Committee</p>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFO */}
          <div className="input-group">
            <input type="text" required placeholder=" " value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            <label>Full Name</label>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.tower} onChange={e => setFormData({...formData, tower: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="I">I</option><option value="II">II</option>
              </select>
              <label>Tower</label>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <input type="text" required placeholder=" " value={formData.flatNo} onChange={e => setFormData({...formData, flatNo: e.target.value})} />
              <label>Flat No</label>
            </div>
          </div>

          <div className="input-group">
            <input type="tel" required placeholder=" " value={formData.phoneNo} onChange={e => setFormData({...formData, phoneNo: e.target.value})} />
            <label>Phone Number</label>
          </div>

          {/* GENDER & STATUS */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value, selectedSports: []})}>
                <option value="" disabled hidden></option>
                <option value="Male">Male</option><option value="Female">Female</option>
              </select>
              <label>Gender</label>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.residentialStatus} onChange={e => setFormData({...formData, residentialStatus: e.target.value})}>
                <option value="" disabled hidden></option>
                <option value="Owner">Owner</option><option value="Tenant">Tenant</option>
              </select>
              <label>Status</label>
            </div>
          </div>

          {/* DYNAMIC SPORTS SECTION */}
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label style={{ color: '#00ffd5', display: 'block', marginBottom: '15px', fontWeight: 'bold', fontSize: '14px' }}>
              SELECT {group} SPORTS (MAX 2):
            </label>

            {formData.gender ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sportsByGroup[group][formData.gender].map((sport) => (
                  <label key={sport} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'white', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      style={{ width: '20px', height: '20px', marginRight: '12px', accentColor: '#00ffd5', cursor: 'pointer' }}
                      checked={formData.selectedSports.includes(sport)}
                      onChange={() => handleSportChange(sport)}
                    />
                    {sport}
                  </label>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic', fontSize: '13px' }}>Please select Gender first to see available sports.</p>
            )}
          </div>

          <button type="submit" className="confirm-btn">CONFIRM REGISTRATION</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;