import React, { useState, useEffect } from 'react';
import WorkflowEngine from './components/WorkflowEngine';
import AcademyMatrix from './components/AcademyMatrix';

export default function App() {
  const [view, setView] = useState('MENU'); // MENU, ACADEMIA, CONSULTA
  const [userLevel, setUserLevel] = useState(
    parseInt(localStorage.getItem('sovereign_level')) || 0
  );

  useEffect(() => {
    localStorage.setItem('sovereign_level', userLevel);
  }, [userLevel]);

  const updateProgress = (newLevel) => {
    if (newLevel > userLevel) setUserLevel(newLevel);
  };

  return (
    <div style={appContainer}>
      {view === 'MENU' && (
        <div style={menuStyle}>
          <h1 style={goldT}>SOVEREIGN ARCHITECT</h1>
          <p style={subT}>SISTEMA DE AUDITORÍA COGNITIVA</p>
          <button onClick={() => setView('ACADEMIA')} style={navBtn}>ENTRAR A LA ACADEMIA (N0-N7)</button>
          <button onClick={() => setView('CONSULTA')} style={navBtn}>CONSULTA PROFESIONAL (MOTOR OMEGA)</button>
          <p style={statusTxt}>NIVEL ACTUAL: {userLevel} | STATUS: {userLevel >= 6 ? 'MASTER' : 'INITIATE'}</p>
        </div>
      )}

      {view === 'ACADEMIA' && (
        <div style={viewBox}>
          <button onClick={() => setView('MENU')} style={backBtn}>← REGRESAR</button>
          <AcademyMatrix userLevel={userLevel} onUpgrade={updateProgress} />
        </div>
      )}

      {view === 'CONSULTA' && (
        <div style={viewBox}>
          <button onClick={() => setView('MENU')} style={backBtn}>← REGRESAR</button>
          <WorkflowEngine userLevel={userLevel} onProgress={updateProgress} />
        </div>
      )}
    </div>
  );
}

const appContainer = { backgroundColor: '#0A0A0A', minHeight: '100vh', color: '#FFF', fontFamily: 'serif' };
const menuStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' };
const goldT = { color: '#C9A227', fontSize: '2.5rem', margin: '0' };
const subT = { color: '#666', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px' };
const navBtn = { background: 'none', border: '1px solid #C9A227', color: '#C9A227', padding: '15px 30px', margin: '10px', cursor: 'pointer', width: '300px', fontWeight: 'bold' };
const statusTxt = { marginTop: '30px', fontSize: '0.7rem', color: '#444' };
const viewBox = { padding: '20px' };
const backBtn = { background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' };
