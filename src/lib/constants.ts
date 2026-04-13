
export const MOTIVATIONAL_PHRASES = {
  morning: [
    "Hoje é um novo começo. Respire fundo e receba o dia com gentileza.",
    "Você é capaz de coisas incríveis. Comece devagar, no seu ritmo.",
    "Sua luz brilha mais forte quando você está em paz consigo mesma.",
    "Que sua manhã seja tão doce quanto sua alma."
  ],
  afternoon: [
    "Faça uma pausa. Você merece um momento de calma no meio do dia.",
    "Lembre-se de respirar. O mundo pode esperar um minuto.",
    "Cada pequeno passo é um progresso. Você está indo bem.",
    "Sua energia é preciosa. Proteja sua paz."
  ],
  night: [
    "O dia acabou. Deixe as preocupações irem embora com o sol.",
    "Agradeça por tudo o que você superou hoje. Você é forte.",
    "Descanse seu coração. Amanhã será uma nova oportunidade.",
    "Durma em paz, sabendo que você fez o seu melhor."
  ]
};

export const MOODS = [
  { id: 'happy', label: 'Feliz', icon: '😊', color: 'bg-yellow-100' },
  { id: 'calm', label: 'Calma', icon: '😌', color: 'bg-blue-100' },
  { id: 'tired', label: 'Cansada', icon: '😴', color: 'bg-purple-100' },
  { id: 'anxious', label: 'Ansiosa', icon: '😰', color: 'bg-orange-100' },
  { id: 'sad', label: 'Triste', icon: '😢', color: 'bg-indigo-100' },
  { id: 'stressed', label: 'Estressada', icon: '😫', color: 'bg-red-100' }
];

export const SELF_CARE_TASKS = [
  { id: 'water', label: 'Beber água', icon: 'Droplets' },
  { id: 'breathe', label: 'Respirar conscientemente', icon: 'Wind' },
  { id: 'pause', label: 'Fazer uma pausa', icon: 'Coffee' },
  { id: 'stretch', label: 'Alongar o corpo', icon: 'Move' },
  { id: 'journal', label: 'Escrever no diário', icon: 'PenTool' }
];

export const BREATHING_TECHNIQUES = [
  { id: 'relax', label: 'Relaxamento', duration: 4, hold: 4, exhale: 4, description: 'Ritmo equilibrado para acalmar os nervos.' },
  { id: 'anxiety', label: 'Alívio de Ansiedade', duration: 4, hold: 7, exhale: 8, description: 'Técnica 4-7-8 para reduzir o estresse rapidamente.' },
  { id: 'focus', label: 'Foco e Clareza', duration: 5, hold: 0, exhale: 5, description: 'Respiração coerente para centrar a mente.' },
  { id: 'sleep', label: 'Sono Profundo', duration: 4, hold: 2, exhale: 6, description: 'Exalação longa para preparar o corpo para o descanso.' }
];

export const SOUNDS = [
  { id: 'rain', label: 'Chuva Suave', icon: 'CloudRain', url: 'https://www.soundjay.com/nature/rain-01.mp3' },
  { id: 'nature', label: 'Natureza', icon: 'Trees', url: 'https://www.soundjay.com/nature/forest-01.mp3' },
  { id: 'waves', label: 'Ondas do Mar', icon: 'Waves', url: 'https://www.soundjay.com/nature/ocean-wave-1.mp3' },
  { id: 'piano', label: 'Piano Relaxante', icon: 'Music', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
];
