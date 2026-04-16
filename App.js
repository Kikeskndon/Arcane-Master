import React, { useState, useEffect } from 'react';
import cardsData from './data/cards.json';

const skills = [
  "Análisis de Sombra", "Síntesis de Opuestos", "Detección de Contradicciones", 
  "Ética de Consulta", "Neutralidad Técnica", "Métrica de Tiempos", 
  "Puentes Narrativos", "Calibración Elemental", "Desmitificación", 
  "Lectura de Contexto", "Intuición Lógica"
];

export default function App() {
  const [level, setLevel] = useState(parseInt(localStorage.getItem('arcane_level')) || 0);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('Todos');

  const filteredCards = filter === 'Todos' ? cardsData : cardsData.filter(c => c.vibracion.includes(filter));

  return (
    <div style={{ background: '#0A0A0A', color: '#E0E0E0', minHeight: '100vh', fontFamily: 'serif' }}>
      <nav style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'sans-serif', letterSpacing: '3px', fontSize: '1rem' }}>ARCANE MASTER // N-{level}</h2>
        <div>
          {['Todos', 'Fuego', 'Agua', 'Aire', 'Tierra'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? '#C9A227' : 'transparent', color: filter === f ? '#000' : '#888', border: '1px solid #333', margin: '0 5px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.7rem' }}>{f.toUpperCase()}</button>
          ))}
        </div>
      </nav>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div style={{ width: '60%', overflowY: 'auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
          {filteredCards.map(card => (
            <div 
              key={card.id} 
              onClick={() => setSelected(card)}
              style={{ padding: '15px', background: '#111', border: selected?.id === card.id ? '1px solid #C9A227' : '1px solid #222', cursor: 'pointer', textAlign: 'center', transition: '0.2s' }}
            >
              <div style={{ fontSize: '0.6rem', color: '#666' }}>{card.vibracion}</div>
              <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>{card.nombre}</div>
            </div>
          ))}
        </div>

        <div style={{ width: '40%', borderLeft: '1px solid #222', padding: '40px', overflowY: 'auto' }}>
          {selected ? (
            <section>
              <h1 style={{ color: '#C9A227', fontSize: '2.5rem', margin: '0 0 10px 0' }}>{selected.nombre}</h1>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#AAA' }}>{selected.expert_logic}</p>
              
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {Object.entries(selected.significados).map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid #222', paddingBottom: '5px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#C9A227', display: 'block' }}>{k.toUpperCase()}</span>
                    <span style={{ fontSize: '0.9rem' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px' }}>
                <h4 style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#666' }}>RETOS SOCRÁTICOS</h4>
                {selected.socratic.map((q, i) => (
                  <p key={i} style={{ fontSize: '0.95rem', borderLeft: '2px solid #C9A227', paddingLeft: '15px', margin: '15px 0' }}>{q}</p>
                ))}
              </div>
            </section>
          ) : (
            <div style={{ color: '#444', textAlign: 'center', marginTop: '100px' }}>SELECCIONA DATA CORE PARA ANÁLISIS</div>
          )}
        </div>
      </div>
    </div>
  );
}
