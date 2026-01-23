import React from 'react';
import { motion } from 'framer-motion';
import GridScan from './GridScan';

const LandingPage = ({ onRegisterClick }) => {
  const cyanGlow = "#9ef9ff";

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#000', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* BACKGROUND LAYER: 3D Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <GridScan
          linesColor="#0a1a2a" 
          scanColor={cyanGlow}
          gridScale={0.1}
          scanOpacity={0.5}
          enablePost={true}
          bloomIntensity={0.5}
        />
      </div>

      {/* CONTENT LAYER: Fully Responsive Typography */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '90%',
        maxWidth: '1200px',
        color: '#fff', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        
        {/* PHASE 1: Drops from top */}
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

        {/* SAC COMMITTEE: Fades in */}
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
        
        {/* ANNUAL SPORTS: Main focus with Glow effect */}
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

        {/* BUTTON: Pops in last */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <button 
            onClick={onRegisterClick}
            style={{
              padding: 'clamp(12px, 2vw, 18px) clamp(30px, 5vw, 60px)',
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              background: 'transparent',
              color: '#fff',
              border: `2px solid ${cyanGlow}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.4s ease',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = cyanGlow;
              e.target.style.color = '#000';
              e.target.style.boxShadow = `0 0 40px ${cyanGlow}`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#fff';
              e.target.style.boxShadow = 'none';
            }}
          >
            Register Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;