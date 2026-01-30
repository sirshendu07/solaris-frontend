import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RegistrationForm.css';

/**
 * Maps age groups to their specific events.
 * Groups A, B, C, D, and I have the same events for all genders.
 * Groups E, F, G, and H change based on Male/Female selection.
 */
const getAutoEvents = (groupId, gender) => {
  const eventMap = {
    'A': ['25 meter run/walker'],
    'B': ['Run 50 meter', 'Tomato/Orange race'],
    'C': ['Math race', 'Tomato/Orange race'],
    'D': ['Math race', 'Balance race (chamoch tuli)'],
    'E': gender === 'Male' ? ['Spot Jump', '50 meter run'] : ['Memory race', 'Such e suto porano'],
    'F': gender === 'Male' ? ['Hit the wicket', 'Aim the football goal'] : ['Memory race', 'Such e suto porano'],
    'G': gender === 'Male' ? ['Aim the football goal', 'Balance race'] : ['Musical chair', 'Balance race'],
    'H': gender === 'Male' ? ['Hari vanga', 'Hit the wicket'] : ['Hari vanga', 'Balance race'],
    'I': ['Go as you like']
  };
  return eventMap[groupId] || [];
};

const RegistrationForm = ({ group, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    tower: '',
    flatNo: '',
    phoneNo: '',
    gender: '',
    residentialStatus: '',
    selectedSports: [] 
  });

  /**
   * Automatically updates the sports list when gender or group changes.
   */
  useEffect(() => {
    const genderIndependentGroups = ['A', 'B', 'C', 'D', 'I'];
    
    // Show events instantly for kids/everyone, or wait for gender selection for adults.
    if (genderIndependentGroups.includes(group) || formData.gender) {
      const events = getAutoEvents(group, formData.gender);
      setFormData(prev => ({ ...prev, selectedSports: events }));
    } else {
      setFormData(prev => ({ ...prev, selectedSports: [] }));
    }
  }, [formData.gender, group]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button to prevent duplicate entries

    try {
      const payload = { ...formData, ageGroup: `Group ${group}` };
      const response = await fetch('https://solaris-backend-s1jz.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Registration Successful!");
        onBack(); // Return to selection page
      } else {
        // Specifically check for MongoDB Combined Unique Key error (Name + Tower + Flat).
        if (result.error && result.error.includes('E11000')) {
          alert(`⚠️ Error: ${formData.fullName} is already registered for Tower ${formData.tower}, Flat ${formData.flatNo}.`);
        } else {
          alert("❌ Error: " + result.error);
        }
        setLoading(false); 
      }
    } catch (err) {
      alert("❌ Server Error. Please check your internet connection.");
      setLoading(false); 
    }
  };

  return (
    <div className="registration-body">
      <div className="glow-box">
        <motion.button whileHover={{ x: -5 }} onClick={onBack} className="back-btn">← BACK</motion.button>
        
        <h2>SOLARIS BONHOOGHLY PHASE 1</h2>
        <h1>GROUP {group} REGISTRATION</h1>
        <p className="subtitle">Annual Sports 2026 - SAC Committee</p>

        <form onSubmit={handleSubmit}>
          {/* NAME INPUT */}
          <div className="input-group">
            <input type="text" required placeholder=" " value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})} />
            <label>Full Name</label>
          </div>

          {/* TOWER & FLAT */}
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

          {/* PHONE NUMBER */}
          <div className="input-group">
            <input type="tel" required placeholder=" " value={formData.phoneNo}
              onChange={e => setFormData({...formData, phoneNo: e.target.value})} />
            <label>Phone Number</label>
          </div>

          {/* GENDER & STATUS */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <select required value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value})}>
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

          {/* DYNAMIC EVENT DISPLAY */}
          <div style={{ 
            marginBottom: '30px', 
            padding: '15px', 
            background: 'rgba(0, 255, 213, 0.05)', 
            borderRadius: '10px', 
            border: '1px dashed rgba(0, 255, 213, 0.3)' 
          }}>
            <h3 style={{ color: '#00ffd5', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase' }}>
              Events You Are Joining:
            </h3>
            
            {(['A', 'B', 'C', 'D', 'I'].includes(group) || formData.gender) ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {formData.selectedSports.map(sport => (
                  <li key={sport} style={{ color: 'white', marginBottom: '8px', fontSize: '1.05rem' }}>
                    🏆 {sport}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>
                Please select Gender to see events.
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="confirm-btn" 
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? "SUBMITTING..." : "CONFIRM REGISTRATION"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;