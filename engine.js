/**
 * SHADOW ENGINE: Algoritmo de detección de patrones ocultos.
 */
export const analyzeShadow = (selectedCards) => {
  const palos = selectedCards.map(c => c.vibracion);
  const niveles = selectedCards.map(c => c.nivel);
  
  const allElements = ["Fuego", "Agua", "Aire", "Tierra"];
  const missing = allElements.filter(el => !palos.some(p => p.includes(el)));
  
  const isStagnant = niveles.every(n => n === niveles[0]);
  const isEscalating = niveles[0] < niveles[1] && niveles[1] < niveles[2];

  let pattern = "ANÁLISIS NEUTRO";
  let message = "Flujo estándar. Procede con la síntesis socrática.";

  if (missing.length > 1) {
    pattern = "SOMBRA DE VACÍO ELEMENTAL";
    message = `Alerta: Ausencia crítica de ${missing.join(" y ")}. El consultante ignora dimensiones fundamentales de la realidad.`;
  } else if (isStagnant) {
    pattern = "SOMBRA DE INERCIA";
    message = "Patrón cíclico detectado. No hay evolución; el sistema se muerde la cola.";
  } else if (isEscalating) {
    pattern = "FLUJO DE MANIFESTACIÓN";
    message = "Aceleración detectada. La resolución está en fase final de ejecución.";
  }

  return { pattern, message };
};

/**
 * MOTOR DE SÍNTESIS GLOBAL: Fusión de inputs en narrativa técnica.
 */
export const generateGlobalSynthesis = (session) => {
  const { refinedQuestion, selectedCards, shadowReport, userSynthesis } = session;
  
  const counts = selectedCards.reduce((acc, card) => {
    const core = card.vibracion.split(' / ')[0];
    acc[core] = (acc[core] || 0) + 1;
    return acc;
  }, {});
  
  const dominant = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), "Neutral");

  return {
    timestamp: new Date().toLocaleString(),
    status: "AUDITORÍA_COMPLETA",
    diagnosis: `Dominancia de ${dominant}. ${shadowReport.message}`,
    logicalArch: `Bajo la premisa [${refinedQuestion}], la integración de ${selectedCards.map(c => c.nombre).join(", ")} concluye que: ${userSynthesis}`,
    conclusion: `Resolución validada en Nivel de Consciencia ${Math.max(...selectedCards.map(c => c.nivel))}.`
  };
};
