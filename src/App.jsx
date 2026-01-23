import React, { useState } from 'react';
import LandingPage from './LandingPage';
import SelectionPage from './SelectionPage';
import RegistrationForm from './RegistrationForm';
import './styles.css';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'ageGroup', or 'form'
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="App">
      {view === 'landing' && (
        <LandingPage onRegisterClick={() => setView('ageGroup')} />
      )}
      
     {view === 'ageGroup' && (
  <SelectionPage onSelectGroup={(group) => {
    setSelectedGroup(group);
    setView('form');
  }} onBack={() => setView('landing')} />
)}

      {view === 'form' && (
  <RegistrationForm 
    group={selectedGroup} 
    onBack={() => setView('ageGroup')} 
  />
)}
    </div>
  );
}

export default App;