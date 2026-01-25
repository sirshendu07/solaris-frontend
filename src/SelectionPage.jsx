import React from 'react';
import { motion } from 'framer-motion';

const groups = [
  { id: 'A', limit: '0-5', events: ['25 meter run/walker'] },
  { id: 'B', limit: '6-10', events: ['Run 50 meter', 'Tomato/Orange race'] },
  { id: 'C', limit: '11-15', events: ['Math race', 'Balance race'] },
  { 
    id: 'D', limit: '16-25', 
    male: ['Spot Jump', '50m Run'], 
    female: ['Memory race', 'Such e suto porano'] 
  },
  { 
    id: 'E', limit: '26-35', 
    male: ['Hit the wicket', '50m Run'], 
    female: ['Memory race', 'Such e suto porano'] 
  },
  { 
    id: 'F', limit: '36-50', 
    male: ['Aim the goal', 'Balance race'], 
    female: ['Musical chair', 'Balance race'] 
  },
  { id: 'G', limit: '50+', events: ['Hari vanga'] },
  { id: 'H', limit: 'Everyone', events: ['Go as you like'], isSpecial: true }
];

const SelectionPage = ({ onSelectGroup, onBack }) => {
  const cyan = "#9ef9ff";

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <motion.button 
        onClick={onBack}
        whileHover={{ x: -5 }}
        style={{ 
          alignSelf: 'flex-start', color: cyan, background: 'none', 
          border: `1px solid ${cyan}`, padding: '10px 20px', 
          cursor: 'pointer', marginBottom: '20px', borderRadius: '4px' 
        }}
      >
        ← BACK
      </motion.button>

      <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
        CHOOSE CATEGORY
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '25px', 
        width: '100%', maxWidth: '1200px' 
      }}>
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            whileHover={{ y: -5, borderColor: cyan, boxShadow: `0 0 20px rgba(158, 249, 255, 0.2)` }}
            onClick={() => onSelectGroup(group.id)}
            style={{
              background: group.isSpecial ? 'rgba(0, 255, 213, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: group.isSpecial ? `2px solid #00ffd5` : `1px solid rgba(158, 249, 255, 0.2)`,
              borderRadius: '20px', padding: '30px 20px',
              textAlign: 'center', cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            <h3 style={{ color: cyan, fontSize: '2.5rem', margin: 0, fontWeight: '900' }}>{group.id}</h3>
            
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '5px' }}>
                AGE: {group.limit}
            </p>

            <div style={{ height: '2px', width: '30px', background: cyan, margin: '15px auto' }} />
            
            <div style={{ textAlign: 'left', marginTop: '10px' }}>
              {group.events ? (
                group.events.map(e => (
                    <p key={e} style={{ color: group.isSpecial ? '#00ffd5' : '#ccc', fontSize: '0.9rem', margin: '5px 0' }}>
                        • {e}
                    </p>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: cyan, fontSize: '0.75rem', fontWeight: 'bold' }}>MALE</p>
                    {group.male.map(e => <p key={e} style={{ color: '#ccc', fontSize: '0.75rem', margin: '3px 0' }}>• {e}</p>)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: cyan, fontSize: '0.75rem', fontWeight: 'bold' }}>FEMALE</p>
                    {group.female.map(e => <p key={e} style={{ color: '#ccc', fontSize: '0.75rem', margin: '3px 0' }}>• {e}</p>)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;