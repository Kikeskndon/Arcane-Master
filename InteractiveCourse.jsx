import React, { useState } from 'react';

export default function InteractiveCourse({ userLevel, onLessonComplete }) {
  const [activeUnit, setActiveUnit] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const syllabus = [
    {
      id: 0,
      title: "Unidad 1: La Mirada en Marsella",
      task: "Si Le Bateleur mira a la izquierda y Le Mat a la derecha, ¿cuál de los dos representa el impulso de dejar atrás el pasado?",
      keyword: "mat",
      solution: "Correcto. Le Mat camina hacia el futuro (derecha), mientras que Le Bateleur mira sus raíces (izquierda)."
    },
    {
      id: 1,
      title: "Unidad 2: El Cuadrado de la Estabilidad",
      task: "¿Qué número representa la seguridad total, el territorio y la estabilidad en el Tarot de Marsella (es un número par)?",
      keyword: "4",
      solution: "Exacto. El 4 (L'Empereur) es la base sólida, el cuadrado de la materia."
    },
    {
      id: 2,
      title: "Unidad 3: El Centro Intelectual",
      task: "Si un consultante tiene un bloqueo de pensamientos negativos, ¿qué palo (Bastos, Copas, Espadas, Oros) está vibrando en desorden?",
      keyword: "espadas",
      solution: "Así es. Las Espadas rigen el centro intelectual y el aire."
    },
    {
      id: 3,
      title: "Unidad 4: La Dualidad de la Papesse",
      task: "La Papesse (II) tiene un libro. ¿Representa la acción inmediata o la acumulación paciente de conocimiento?",
      keyword: "acumulación",
      solution: "Efectivo. El Grado 2 siempre es gestación, silencio y acumulación."
    },
    {
      id: 4,
      title: "Unidad 5: El Paso a la Crisis",
      task: "¿Qué número (del 1 al 10) representa la primera crisis de crecimiento que rompe la estabilidad del 4?",
      keyword: "5",
      solution: "Correcto. El 5 es el punto en el centro del cuadrado que busca salir hacia lo desconocido."
    },
    {
      id: 5,
      title: "Unidad 6: Los Arcanos Mayores Serie II",
      task: "Si Le Bateleur es el 1, ¿qué arcano es el 11 y representa el inicio del dominio espiritual?",
      keyword: "force",
      solution: "Bien. La Force (11) es la octava superior de Le Bateleur."
    },
    {
      id: 6,
      title: "Unidad 7: El Centro Emocional",
      task: "Si la pregunta es sobre el amor y los sentimientos, ¿qué palo es el rector?",
      keyword: "copas",
      solution: "Exacto. Las Copas rigen el agua y el corazón."
    },
    {
      id: 7,
      title: "Unidad 8: La Poda Necesaria",
      task: "¿Cuál es el nombre del Arcano XIII que limpia lo viejo para que nazca lo nuevo?",
      keyword: "nom",
      solution: "L'Arcane sans nom (o Arcano sin nombre). La transformación radical."
    },
    {
      id: 8,
      title: "Unidad 9: La Realización Total",
      task: "¿Qué Arcano representa el éxito absoluto en los 4 centros de la máquina humana?",
      keyword: "monde",
      solution: "Le Monde (El Mundo). El 21. El final del camino."
    },
    {
      id: 9,
      title: "Unidad 10: La Mnemotecnia de Grados",
      task: "En Jodorowsky, ¿qué es más maduro evolutivamente: un 3 de Bastos o un 9 de Bastos?",
      keyword: "9",
      solution: "Perfecto. El 9 es la antesala de la realización total (10)."
    }
  ];

  const handleValidation = () => {
    const unit = syllabus[activeUnit];
    if (userAnswer.toLowerCase().includes(unit.keyword)) {
      setFeedback(`VALIDADO: ${unit.solution}`);
      if (activeUnit === syllabus.length - 1) {
        onLessonComplete(userLevel + 1);
      }
    } else {
      setFeedback("ERROR: La respuesta no cumple con el rigor técnico del método.");
    }
  };

  const containerStyle = { padding: '30px', background: '#050505', border: '1px solid #C9A227' };
  const goldText = { color: '#C9A227', letterSpacing: '2px', borderBottom: '1px solid #222', paddingBottom: '10px' };
  const cardStyle = { background: '#111', padding: '20px', marginTop: '20px', borderRadius: '4px' };
  const inputStyle = { width: '100%', background: '#000', border: '1px solid #333', color: '#FFF', padding: '12px', marginBottom: '10px' };
  const btnStyle = { width: '100%', background: '#C9A227', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer' };
  const feedbackStyle = { marginTop: '20px', padding: '15px', background: '#000', borderLeft: '4px solid', fontSize: '0.9rem' };

  return (
    <div style={containerStyle}>
      <h2 style={goldText}>ACADEMIA DE ARQUITECTURA COGNITIVA</h2>
      <div style={{color: '#666', fontSize: '0.8rem'}}>Lección {activeUnit + 1} de 10</div>
      
      <div style={cardStyle}>
        <h3>{syllabus[activeUnit].title}</h3>
        <p style={{fontStyle: 'italic', marginBottom: '20px', color: '#BBB'}}>{syllabus[activeUnit].task}</p>
        <input 
          style={inputStyle}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Escribe tu análisis..."
        />
        <button onClick={handleValidation} style={btnStyle}>AUDITAR CONOCIMIENTO</button>
      </div>

      {feedback && (
        <div style={{...feedbackStyle, borderColor: feedback.includes("ERROR") ? '#F00' : '#0F0'}}>
          <p>{feedback}</p>
          {!feedback.includes("ERROR") && activeUnit < syllabus.length - 1 && (
            <button 
              onClick={() => { setActiveUnit(activeUnit + 1); setFeedback(""); setUserAnswer(""); }} 
              style={{marginTop: '10px', padding: '10px', background: '#0F0', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
            >
              SIGUIENTE UNIDAD →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
