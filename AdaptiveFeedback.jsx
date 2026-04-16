import React, { useState } from 'react';
import { evaluateSynthesis } from '../logic/evaluator';

export default function AdaptiveFeedback({ session, userLevel, onUpdateLevel }) {
  const [evaluation, setEvaluation] = useState(null);

  const triggerEvaluation = () => {
    const result = evaluateSynthesis(session.userSynthesis, userLevel);
    setEvaluation(result);
    
    // Si la puntuación es perfecta y el nivel es bajo, sugerir ascenso
    if (result.score >= 6 && userLevel < 7) {
      onUpdateLevel(userLevel + 1);
    }
  };

  return (
    <div style={feedbackContainer}>
      <h3 style={goldT}>AUDITORÍA DE COMPETENCIA (RUBRICA 7D)</h3>
      {!evaluation ? (
        <button onClick={triggerEvaluation} style={evalBtn}>INICIAR EVALUACIÓN DE SÍNTESIS</button>
      ) : (
        <div style={reportBox}>
          <div style={scoreGrid}>
            {Object.entries(evaluation.dimensions).map(([dim, pass]) => (
              <div key={dim} style={{...dimTag, color: pass ? '#0F0' : '#F00'}}>
                {dim.toUpperCase()}: {pass ? 'PASSED' : 'FAILED'}
              </div>
            ))}
          </div>
          <p style={feedbackTxt}>{evaluation.feedback}</p>
          {evaluation.score < 4 && <div style={exerciseBox}>EJERCICIO CORRECTIVO: Re-escribe tu síntesis eliminando todas las referencias a "yo" y "mi".</div>}
        </div>
      )}
    </div>
  );
}

const feedbackContainer = { marginTop: '20px', borderTop: '1px solid #222', paddingTop: '20px' };
const goldT = { color: '#C9A227', fontSize: '0.8rem', letterSpacing: '2px' };
const evalBtn = { background: '#111', color: '#C9A227', border: '1px solid #C9A227', padding: '10px', cursor: 'pointer', width: '100%' };
const reportBox = { background: '#050505', padding: '15px', marginTop: '10px' };
const scoreGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '0.7rem' };
const dimTag = { fontFamily: 'monospace' };
const feedbackTxt = { marginTop: '15px', fontStyle: 'italic', borderLeft: '2px solid #C9A227', paddingLeft: '10px' };
const exerciseBox = { background: '#1a0000', color: '#ff4444', padding: '10px', marginTop: '10px', fontSize: '0.8rem', border: '1px solid #F00' };
