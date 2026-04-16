export const ACADEMY_LEVELS = {
  N0: {
    name: "Iniciación Silenciosa",
    skill: "Neutralidad Técnica",
    case: {
      description: "Un consultante pregunta: '¿Mi ex volverá conmigo?'. Salen: 3 de Espadas + El Diablo + 10 de Espadas.",
      challenge: "¿Cuál es la respuesta técnica eliminando toda empatía emocional?",
      options: [
        "Hay esperanza si ambos trabajan en su sombra.",
        "El ciclo ha colapsado por toxicidad; la estructura es irrecuperable.",
        "Debes esperar a que la energía fluya mejor."
      ],
      correctIndex: 1
    }
  },
  N1: {
    name: "Analista de Sombra",
    skill: "Análisis de Sombra",
    case: {
      description: "Tirada de éxito: El Sol + El Mundo. Pero la carta de 'Sombra' es el 4 de Oros.",
      challenge: "Identifica el riesgo oculto en esta plenitud.",
      options: [
        "El éxito traerá envidias externas.",
        "El consultante se estancará por miedo a perder su posición actual.",
        "Habrá pérdidas económicas súbitas."
      ],
      correctIndex: 1
    }
  }
  // Implementación escalable hasta N7...
};
