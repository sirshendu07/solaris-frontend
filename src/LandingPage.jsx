import React from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = ({ onRegisterClick }) => {
  const cyanGlow = "#9ef9ff";

  return (
    <div className="landing-container">
      {/* Background Image Layer */}
      <div className="society-bg"></div>
      
      {/* Content Layer */}
      <div className="landing-content">
        
        {/* Solaris Title */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', 
            fontWeight: '800', 
            letterSpacing: '2px',
            margin: 0
          }}
        >
          SOLARIS BONHOOGHLY PHASE 1
        </motion.h2>

        {/* Committee Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', 
            letterSpacing: '5px', 
            color: cyanGlow, 
            margin: '10px 0',
            textTransform: 'uppercase'
          }}
        >
          SAC COMMITTEE PRESENTS
        </motion.p>
        
        {/* Main Event Title with Glow */}
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 6rem)', 
            fontWeight: '900', 
            margin: '0 0 30px 0', 
            textShadow: `0 0 30px ${cyanGlow}88`,
            lineHeight: '1.1'
          }}
        >
          ANNUAL SPORTS 2026
        </motion.h1>

        {/* Register Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <button 
            className="register-btn"
            onClick={onRegisterClick}
            style={{ borderColor: cyanGlow }}
          >
            Register Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;