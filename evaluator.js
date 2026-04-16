/**
 * EVALUADOR DE SÍNTESIS: Rúbrica de 7 dimensiones.
 * Califica la síntesis del usuario para determinar su competencia real.
 */
export const evaluateSynthesis = (synthesis, userLevel) => {
  const dimensions = {
    precision: synthesis.length > 50,
    coherencia: synthesis.includes("porque") || synthesis.includes("debido a"),
    autonomia: !synthesis.includes("creo") && !synthesis.includes("tal vez"),
    profundidad: synthesis.length > 120,
    tecnicismo: ["estructura", "patrón", "vibración", "sombra"].some(w => synthesis.toLowerCase().includes(w)),
    objetividad: !["yo", "mi", "me"].some(w => synthesis.toLowerCase().split(" ").includes(w)),
    sintesis: synthesis.split(".").length >= 2
  };

  const score = Object.values(dimensions).filter(Boolean).length;
  
  // Lógica de Feedback Basado en Error
  let feedback = "";
  if (score < 3) feedback = "ERROR: Análisis superficial. Estás describiendo cartas, no estructuras de realidad. Ejecuta micro-ejercicio: Define el vacío elemental detectado sin usar nombres de cartas.";
  else if (score < 5) feedback = "ALERTA: Falta objetividad técnica. Elimina el sesgo personal del reporte.";
  else feedback = "SÍNTESIS VALIDADA: Competencia profesional detectada.";

  return { score, dimensions, feedback };
};

/**
 * LÓGICA DE AYUDA DECRECIENTE: Retira soporte según el nivel.
 */
export const getVisibleData = (card, userLevel) => {
  // Nivel 0-2: Data Completa
  // Nivel 3-5: Oculta Significados (Solo Expert Logic y Socrático)
  // Nivel 6-7: Oculta Expert Logic (Solo Socrático y Vibración)
  return {
    ...card,
    significados: userLevel >= 3 ? "[RECURSO BLOQUEADO POR COMPETENCIA]" : card.significados,
    expert_logic: userLevel >= 6 ? "[RECURSO BLOQUEADO: USA TU PROPIO ANÁLISIS]" : card.expert_logic
  };
};
