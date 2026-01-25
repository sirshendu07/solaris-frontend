import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RegistrationForm.css';

const getAutoEvents = (groupId, gender) => {
  const eventMap = {
    'A': ['25 meter run/walker'],
    'B': ['Run 50 meter', 'Tomato/Orange race'],
    'C': ['Math race', 'Balance race (chamoch tuli)'],
    'D': gender === 'Male' ? ['Spot Jump', '50 meter run'] : ['Memory race', 'Such e suto porano'],
    'E': gender === 'Male' ? ['Hit the wicket', '50 meter run'] : ['Memory race', 'Such e suto porano'],
    'F': gender === 'Male' ? ['Aim the football goal', 'Balance race'] : ['Musical chair', 'Balance race'],
    'G': ['Hari vanga'],
    'H': ['Go as you like'] // Now exclusively in Group H
  };

  return eventMap[groupId] || [];
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

  useEffect(() => {
    // Groups that need gender to determine events: D, E, F
    const needsGender = ['D', 'E', 'F'].includes(group);
    
    if (!needsGender || (needsGender && formData.gender)) {
      const events = getAutoEvents(group, formData.gender);
      setFormData(prev => ({ ...prev, selectedSports: events }));
    }
  }, [formData.gender, group]);

// 1. Add 'loading' to your state at the top of the component
const [loading, setLoading] = useState(false); 

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 2. IMMEDIATELY set loading to true to disable the button
  setLoading(true); 

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
      // 3. Set loading back to false if there's an error so they can try again
      setLoading(false); 
    }
  } catch (err) {
    alert("❌ Server Error. Please check your connection.");
    setLoading(false); 
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
            {(formData.gender || !['D', 'E', 'F'].includes(group)) ? (
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
  disabled={loading} // This prevents multiple clicks
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