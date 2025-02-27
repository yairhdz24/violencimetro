// Get risk color based on level
export const getRiskColor = (level) => {
    if (level <= 3) return '#4CAF50'; // green
    if (level <= 7) return '#FFC107'; // amber
    return '#FF5252'; // red
  };
  
  // Get risk message based on level
  export const getRiskMessage = (level) => {
    if (level <= 3) {
      return {
        title: 'Nivel Básico',
        message: 'Tu nivel de autoconocimiento es básico. Tienes un buen punto de partida, pero hay oportunidades para profundizar en tu desarrollo personal.'
      };
    }
    if (level <= 7) {
      return {
        title: 'Nivel Intermedio',
        message: 'Has desarrollado un nivel intermedio de autoconocimiento. Estás en el camino correcto, pero podrías beneficiarte de más herramientas y recursos.'
      };
    }
    return {
      title: 'Nivel Avanzado',
      message: 'Tu nivel de autoconocimiento es avanzado. Recomendamos que consultes recursos adicionales y consideres profundizar en aspectos específicos para seguir creciendo.'
    };
  };