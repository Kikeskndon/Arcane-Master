import React, { useState } from 'react';
import { analyzeShadow, generateGlobalSynthesis } from '../logic/engine';

export default function WorkflowEngine({ cards, userLevel }) {
  const [step, setStep] = useState(1);
  const [session, setSession] = useState({
    rawQuestion: "",
    refinedQuestion: "",
    selectedCards: [],
    userSynthesis: "",
    shadowReport: null
  });

  const refineQuestion = () => {
    const ethics = ["moriré", "suerte", "infiel"].some(w => session.rawQuestion.toLowerCase().includes(w));
    const refined = ethics 
      ? `REFORMULACIÓN: ¿Qué aspectos de mi control interno debo ajustar ante la incertidumbre de [${session.rawQuestion}]?`
      : `EVOLUCIÓN: ¿Qué estructura de realidad manifiesto a través de: ${session.rawQuestion}?`;
    setSession({...session, refinedQuestion: refined});
    setStep(2);
  };

  const handleAnalysis = () => {
    const shadow = analyzeShadow(session.selectedCards);
    setSession({...session, shadowReport: shadow});
    setStep(3);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#E0E0E0' }}>
      {step === 1 && (
        <div>
          <h2 style={{color: '#C9A227'}}>SMART ANALYSER</h2>
          <textarea 
            style={inputStyle} 
            placeholder="Pregunta inicial..." 
            onChange={(e) => setSession({...session, rawQuestion: e.target.value})}
          />
          <button onClick={refineQuestion} style={btnStyle}>REFORMULAR</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{color: '#C9A227'}}>GUÍA DE LECTURA REAL</h2>
          <p style={{fontStyle: 'italic', color: '#888'}}>{session.refinedQuestion}</p>
          <div style={selectorStyle}>
            {cards.filter(c => c.nivel <= userLevel).map(c => (
              <button key={c.id} onClick={() => session.selectedCards.length < 3 && setSession({...session, selectedCards: [...session.selectedCards, c]})} style={miniBtn}>
                {c.nombre}
              </button>
            ))}
          </div>
          <div style={{display: 'flex', gap: '10px', margin: '20px 0'}}>
            {session.selectedCards.map((c, i) => (
              <div key={i} style={cardBox}>
                <strong>{c.nombre}</strong>
                <p style={{fontSize: '0.7rem'}}>{c.socratic[0]}</p>
              </div>
            ))}
          </div>
          {session.selectedCards.length === 3 && <button onClick={handleAnalysis} style={btnStyle}>ACTIVAR SOMBRA</button>}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{color: '#C9A227'}}>SHADOW ENGINE</h2>
          <div style={shadowAlert}>{session.shadowReport.message}</div>
          <textarea 
            style={inputStyle} 
            placeholder="Captura tu síntesis socrática aquí..." 
            onChange={(e) => setSession({...session, userSynthesis: e.target.value})}
          />
          <button onClick={() => setStep(4)} style={btnStyle}>GENERAR SÍNTESIS GLOBAL</button>
        </div>
      )}

      {step === 4 && (() => {
        const final = generateGlobalSynthesis(session);
        return (
          <div style={terminalStyle}>
            <h2 style={{color: '#C9A227'}}>REPORTE DE AUDITORÍA</h2>
            <p style={{color: '#0F0'}}>[{final.status}] - {final.timestamp}</p>
            <p><strong>DIAGNÓSTICO:</strong> {final.diagnosis}</p>
            <p><strong>ARQUITECTURA:</strong> {final.logicalArch}</p>
            <p><strong>CONCLUSIÓN:</strong> {final.conclusion}</p>
            <button onClick={() => window.location.reload()} style={{marginTop: '20px', background: '#222', color: '#FFF', border: 'none', padding: '10px'}}>NUEVA SESIÓN</button>
          </div>
        );
      })()}
    </div>
  );
}

const inputStyle = { width: '100%', background: '#111', color: '#FFF', border: '1px solid #333', padding: '15px', marginBottom: '10px' };
const btnStyle = { width: '100%', background: '#C9A227', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer' };
const selectorStyle = { display: 'flex', flexWrap: 'wrap', gap: '5px', maxHeight: '150px', overflowY: 'auto', padding: '10px', border: '1px solid #222' };
const miniBtn = { fontSize: '0.6rem', background: '#000', color: '#888', border: '1px solid #222', cursor: 'pointer' };
const cardBox = { flex: 1, background: '#111', padding: '10px', border: '1px solid #C9A227' };
const shadowAlert = { padding: '15px', borderLeft: '4px solid #C9A227', background: '#050505', marginBottom: '20px', fontSize: '0.9rem' };
const terminalStyle = { border: '1px solid #C9A227', padding: '25px', background: '#000', fontFamily: 'monospace', lineHeight: '1.5' };
