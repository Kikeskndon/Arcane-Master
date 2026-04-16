import React, { useState, useMemo } from 'react';
import cards from './data/cards.json';

// --- SKILL MATRIX CONFIGURATION ---
const SKILL_MATRIX = [
  { id: 0, name: "Neutralidad Técnica", desc: "Eliminación de sesgo emocional en la interpretación." },
  { id: 1, name: "Análisis de Sombra", desc: "Identificación de bloqueos y sabotajes inconscientes." },
  { id: 2, name: "Detección de Contradicciones", desc: "Hallar inconsistencias en la narrativa del consultante." },
  { id: 3, name: "Ética de Consulta", desc: "Manejo de información sensible sin manipulación." },
  { id: 4, name: "Métrica de Tiempos", desc: "Cálculo de la velocidad de manifestación de los eventos." },
  { id: 5, name: "Puentes Narrativos", desc: "Conexión lógica entre arcanos dispares." },
  { id: 6, name: "Sintesis de Opuestos", desc: "Alquimia de datos para resoluciones binarias." },
  { id: 7, name: "Maestría Arcana", desc: "Control total del sistema Sovereign Architect." }
];

// --- ACADEMY CASE SIMULATOR ---
const ACADEMY_CHALLENGES = {
  0: {
    title: "EXAMEN N0: Neutralidad",
    case: "Consultante pregunta: '¿Me ama?'. Cartas: 3 de Espadas + Diablo + Luna.",
    question: "Bajo protocolo de neutralidad técnica, ¿cuál es el diagnóstico?",
    options: ["Hay un amor oculto y pasional.", "Vínculo basado en obsesión y distorsión; estructura rota.", "Debes esperar a que la luna aclare los sentimientos."],
    correct: 1
  },
  1: {
    title: "EXAMEN N1: Sombra",
    case: "Tirada de Negocios: El Sol + 10 de Oros. Sombra: 4 de Oros.",
    question: "¿Qué impide la expansión del éxito?",
    options: ["Falta de dinero.", "El miedo a perder el control y la tacañería mental.", "Envidia de los socios."],
    correct: 1
  }
  // Se extiende dinámicamente según el nivel...
};

export default function ArcaneApp() {
  const [level, setLevel] = useState(parseInt(localStorage.getItem('arc_lvl')) || 0);
  const [view, setView] = useState('matrix'); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [academyMsg, setAcademyMsg] = useState("");

  const filteredCards = useMemo(() => cards.filter(c => c.nivel <= level), [level]);

  const handleAcademy = (idx) => {
    if (idx === ACADEMY_CHALLENGES[level].correct) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      localStorage.setItem('arc_lvl', nextLevel);
      setAcademyMsg("VALIDACIÓN COMPLETA. ACCESO A NIVEL N" + nextLevel);
      setView('matrix');
    } else {
      setAcademyMsg("ERROR COGNITIVO: Reintenta el análisis.");
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={logoStyle}>ARCANE MASTER // <span style={{color:'#C9A227'}}>L-{level}</span></h1>
        <nav>
          <button onClick={() => setView('matrix')} style={navBtn}>SKILL_MATRIX</button>
          <button onClick={() => setView('data')} style={navBtn}>DATA_CORE</button>
          <button onClick={() => setView('academy')} style={navBtn}>ACADEMIA</button>
        </nav>
      </header>

      {view === 'matrix' && (
        <main style={{padding: '40px'}}>
          <h2 style={titleStyle}>MATRIZ DE COMPETENCIAS</h2>
          <div style={gridStyle}>
            {SKILL_MATRIX.map(skill => (
              <div key={skill.id} style={{...skillCard, opacity: level >= skill.id ? 1 : 0.2}}>
                <div style={{fontSize: '0.7rem', color:'#C9A227'}}>COMPETENCIA_0{skill.id}</div>
                <h3>{skill.name}</h3>
                <p style={{fontSize:'0.8rem', color:'#888'}}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {view === 'data' && (
        <div style={{display:'flex', height:'85vh'}}>
          <div style={cardListStyle}>
            {filteredCards.map(c => (
              <div key={c.id} onClick={() => setSelectedCard(c)} style={{...itemStyle, border: selectedCard?.id === c.id ? '1px solid #C9A227' : '1px solid #222'}}>
                {c.nombre}
              </div>
            ))}
          </div>
          <div style={inspectorStyle}>
            {selectedCard ? (
              <section>
                <h2 style={{color:'#C9A227'}}>{selectedCard.nombre}</h2>
                <p style={{fontStyle:'italic', color:'#666'}}>{selectedCard.expert_logic}</p>
                <div style={{marginTop:'20px'}}>
                  {selectedCard.socratic.map((q, i) => <p key={i} style={qStyle}>{q}</p>)}
                </div>
              </section>
            ) : <p style={{color:'#222'}}>SELECCIONA DATA</p>}
          </div>
        </div>
      )}

      {view === 'academy' && (
        <div style={academyContainer}>
          {ACADEMY_CHALLENGES[level] ? (
            <div style={challengeBox}>
              <h2 style={{color:'#C9A227'}}>{ACADEMY_CHALLENGES[level].title}</h2>
              <p style={{fontSize:'1.2rem'}}>{ACADEMY_CHALLENGES[level].case}</p>
              <p style={{margin:'20px 0'}}>{ACADEMY_CHALLENGES[level].question}</p>
              {ACADEMY_CHALLENGES[level].options.map((opt, i) => (
                <button key={i} onClick={() => handleAcademy(i)} style={optBtn}>{opt}</button>
              ))}
              <p style={{marginTop:'20px', color:'#C9A227'}}>{academyMsg}</p>
            </div>
          ) : <p>TODAS LAS COMPETENCIAS VALIDADAS.</p>}
        </div>
      )}
    </div>
  );
}

// --- STYLES ---
const containerStyle = { background: '#0A0A0A', color: '#E0E0E0', minHeight: '100vh', fontFamily: 'serif' };
const headerStyle = { borderBottom: '1px solid #1A1A1A', padding: '20px', display: 'flex', justifyContent: 'space-between' };
const logoStyle = { fontSize: '0.8rem', letterSpacing: '4px' };
const navBtn = { background: 'none', border: '1px solid #222', color: '#888', padding: '5px 15px', marginLeft: '10px', cursor: 'pointer' };
const titleStyle = { fontSize: '1.5rem', marginBottom: '30px', letterSpacing: '2px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' };
const skillCard = { padding: '20px', background: '#111', border: '1px solid #222' };
const cardListStyle = { width: '30%', overflowY: 'auto', padding: '20px', borderRight: '1px solid #1A1A1A' };
const itemStyle = { padding: '10px', marginBottom: '5px', cursor: 'pointer', fontSize: '0.9rem' };
const inspectorStyle = { width: '70%', padding: '40px' };
const qStyle = { borderLeft: '2px solid #C9A227', paddingLeft: '15px', margin: '15px 0' };
const academyContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' };
const challengeBox = { maxWidth: '600px', border: '1px solid #C9A227', padding: '40px' };
const optBtn = { display: 'block', width: '100%', padding: '15px', marginBottom: '10px', background: '#111', border: '1px solid #333', color: '#FFF', textAlign: 'left', cursor: 'pointer' };
