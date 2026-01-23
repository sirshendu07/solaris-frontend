import React from 'react';
import { motion } from 'framer-motion';

const groups = [
  { id: 'A', limit: '0-9' },
  { id: 'B', limit: '10-19' },
  { id: 'C', limit: '20-29' },
  { id: 'D', limit: '30-39' },
  { id: 'E', limit: '40-49' },
  { id: 'F', limit: '50+' }
];

const SelectionPage = ({ onSelectGroup, onBack }) => {
  const cyan = "#9ef9ff";

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      {/* Back Button */}
      <motion.button 
        onClick={onBack}
        whileHover={{ x: -5 }}
        style={{ 
          alignSelf: 'flex-start', 
          color: cyan, 
          background: 'none', 
          border: `1px solid ${cyan}`, 
          padding: '10px 20px', 
          cursor: 'pointer', 
          marginBottom: '30px',
          borderRadius: '4px' 
        }}
      >
        ← BACK
      </motion.button>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '50px', textAlign: 'center' }}
      >
        CHOOSE CATEGORY
      </motion.h1>

      {/* Responsive Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        width: '100%', 
        maxWidth: '1100px' 
      }}>
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => onSelectGroup(group.id)}
            style={{
              background: 'rgba(158, 249, 255, 0.03)',
              border: `1px solid rgba(158, 249, 255, 0.2)`,
              borderRadius: '20px',
              padding: '50px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `1px solid ${cyan}`;
              e.currentTarget.style.boxShadow = `0 0 30px rgba(158, 249, 255, 0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = `1px solid rgba(158, 249, 255, 0.2)`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 style={{ fontSize: '5rem', color: '#fff', margin: 0, fontWeight: '900' }}>
              {group.id}
            </h2>
            <div style={{ 
              height: '2px', 
              width: '40px', 
              background: cyan, 
              margin: '15px auto' 
            }} />
            <p style={{ color: cyan, fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '3px' }}>
              AGE: {group.limit}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;