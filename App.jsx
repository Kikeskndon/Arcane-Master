import React, { useState, useEffect } from 'react';
import cards from './data/cards.json';

const skills = [
  "Análisis de Sombra", "Síntesis de Opuestos", "Detección de Contradicciones", 
  "Ética de Consulta", "Neutralidad Técnica", "Métrica de Tiempos", 
  "Puentes Narrativos", "Calibración Elemental", "Desmitificación", 
  "Lectura de Contexto", "Intuición Lógica"
];

const levels = ["N0", "N1", "N2", "N3", "N4", "N5", "N6", "N7"];

export default function App() {
  const [level, setLevel] = useState(parseInt(localStorage.getItem('arcane_level')) || 0);
  const [view, setView] = useState('data');
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");

  const handleLevelUp = () => {
    // Simulador de caso para N0 -> N1
    if (level === 0 && answer.toLowerCase().includes("toxicidad")) {
      const next = level + 1;
      setLevel(next);
      localStorage.setItem('arcane_level', next);
      alert("COMPETENCIA N1 DESBLOQUEADA");
      setView('data');
    } else {
      alert("ERROR TÉCNICO: Análisis inconsistente.");
    }
  };

  return (
    <div style={{ background: '#0A0A0A', color: '#E0E0E0', minHeight: '100vh', fontFamily: 'serif' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'sans-serif', letterSpacing: '4px', fontSize: '0.8rem' }}>ARCANE MASTER // LVL_{levels[level]}</h2>
        <nav>
          <button onClick={() => setView('data')} style={btnStyle}>DATA_CORE</button>
          <button onClick={() => setView('academy')} style={btnStyle}>ACADEMIA</button>
        </nav>
      </header>

      {view === 'data' ? (
        <div style={{ display: 'flex', height: '90vh' }}>
          <div style={{ width: '60%', overflowY: 'auto', padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
            {cards.map(c => (
              <div 
                key={c.id} 
                onClick={() => level >= c.nivel ? setSelected(c) : alert("NIVEL INSUFICIENTE")}
                style={{ 
                  padding: '15px', background: '#111', border: selected?.id === c.id ? '1px solid #C9A227' : '1px solid #1a1a1a',
                  cursor: level >= c.nivel ? 'pointer' : 'not-allowed', opacity: level >= c.nivel ? 1 : 0.3
                }}
              >
                <div style={{ fontSize: '0.6rem', color: '#555' }}>{c.vibracion}</div>
                <div style={{ fontSize: '0.8rem' }}>{c.nombre}</div>
              </div>
            ))}
          </div>

          <div style={{ width: '40%', padding: '40px', borderLeft: '1px solid #111' }}>
            {selected ? (
              <section>
                <h1 style={{ color: '#C9A227', fontSize: '2rem', margin: '0' }}>{selected.nombre}</h1>
                <p style={{ fontStyle: 'italic', color: '#777', margin: '10px 0 30px 0' }}>{selected.expert_logic}</p>
                {selected.socratic.map((q, i) => <p key={i} style={{ borderLeft: '1px solid #C9A227', paddingLeft: '15px', fontSize: '0.9rem', color: '#AAA' }}>{q}</p>)}
              </section>
            ) : <div style={{ color: '#222', fontSize: '2rem' }}>NULL_DATA</div>}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '100px auto', padding: '20px', border: '1px solid #C9A227' }}>
          <h3 style={{ color: '#C9A227' }}>RETAR COMPETENCIA: {skills[level]}</h3>
          <p>Caso: Consultante pregunta por relación rota. Cartas: 3 de Espadas + Diablo + Torre.</p>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Analiza la vibración técnica y define la palabra clave de resolución:</p>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ background: '#000', color: '#fff', border: '1px solid #333', padding: '10px', width: '100%' }} />
          <button onClick={handleLevelUp} style={{ marginTop: '20px', background: '#C9A227', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>EJECUTAR VALIDACIÓN</button>
        </div>
      )}
    </div>
  );
}

const btnStyle = { background: 'none', border: '1px solid #222', color: '#555', padding: '5px 15px', marginLeft: '10px', cursor: 'pointer', fontSize: '0.6rem' };
