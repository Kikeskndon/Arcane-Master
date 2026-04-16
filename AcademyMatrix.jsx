import React, { useState } from 'react';

export default function AcademyMatrix({ userLevel, onUpgrade }) {
  const [examCard, setExamCard] = useState(null);
  const [answer, setAnswer] = useState("");

  const levels = [
    { id: 0, title: "N0: Iniciado", requirement: "Ninguno", skill: "Observación de Sombra" },
    { id: 1, title: "N1: Neófito", requirement: "Examen N0", skill: "Arquitectura Elemental" },
    { id: 2, title: "N2: Practicante", requirement: "Examen N1", skill: "Sintaxis de Realidad" },
    { id: 3, title: "N3: Analista", requirement: "Examen N2", skill: "Desbloqueo de Lógica Experta" },
    { id: 4, title: "N4: Especialista", requirement: "Examen N3", skill: "Diagnóstico de Patrones" },
    { id: 5, title: "N5: Maestro", requirement: "Examen N4", skill: "Retirada de Significados" },
    { id: 6, title: "N6: Arquitecto", requirement: "Examen N5", skill: "Independencia de Datos" },
    { id: 7, title: "N7: Sovereign", requirement: "Maestría Total", skill: "Protocolo Singularity" }
  ];

  const handleExam = () => {
    // Lógica de validación: La respuesta debe tener tecnicismos del nivel actual
    const currentLevelData = levels[userLevel];
    if (answer.length > 30 && (answer.includes("sombra") || answer.includes("lógica"))) {
      onUpgrade(userLevel + 1);
      alert(`ASCENSO VALIDADO: Ahora eres ${levels[userLevel + 1].title}`);
      setExamCard(null);
      setAnswer("");
    } else {
      alert("ERROR: Análisis insuficiente. El sistema rechaza tu ascenso.");
    }
  };

  return (
    <div style={{ color: '#E0E0E0' }}>
      <h2 style={{ color: '#C9A227' }}>SKILL MATRIX & ACADEMIA</h2>
      <div style={matrixGrid}>
        {levels.map(l => (
          <div key={l.id} style={{
            ...levelCard,
            borderColor: l.id <= userLevel ? '#C9A227' : '#222',
            opacity: l.id <= userLevel ? 1 : 0.5
          }}>
            <h4 style={{ margin: 0 }}>{l.title}</h4>
            <p style={{ fontSize: '0.7rem', color: '#888' }}>SKILL: {l.skill}</p>
            {l.id === userLevel && l.id < 7 && (
              <button onClick={() => setExamCard(l)} style={examBtn}>INICIAR EXAMEN DE ASCENSO</button>
            )}
          </div>
        ))}
      </div>

      {examCard && (
        <div style={examOverlay}>
          <h3 style={{ color: '#C9A227' }}>EXAMEN DE COMPETENCIA {examCard.title}</h3>
          <p>Define la relación entre el "Vacío Elemental" y la "Inercia de Sombra" para validar tu nivel:</p>
          <textarea 
            style={inputStyle} 
            onChange={(e) => setAnswer(e.target.value)} 
            placeholder="Escribe tu análisis técnico..."
          />
          <button onClick={handleExam} style={validateBtn}>ENVIAR PARA AUDITORÍA</button>
          <button onClick={() => setExamCard(null)} style={{ background: 'none', color: '#666', border: 'none', marginTop: '10px' }}>CANCELAR</button>
        </div>
      )}
    </div>
  );
}

const matrixGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px', marginTop: '20px' };
const levelCard = { background: '#111', padding: '15px', border: '1px solid', textAlign: 'center' };
const examBtn = { marginTop: '10px', background: '#C9A227', color: '#000', border: 'none', padding: '5px 10px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' };
const examOverlay = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#000', padding: '40px', border: '2px solid #C9A227', width: '90%', maxWidth: '500px', zIndex: 100 };
const inputStyle = { width: '100%', height: '100px', background: '#111', color: '#FFF', border: '1px solid #333', padding: '10px', margin: '15px 0' };
const validateBtn = { width: '100%', background: '#C9A227', color: '#000', padding: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' };
