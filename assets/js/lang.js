// lang.js
const translations = {
  es: {
    "about-title": "Sobre Mí",
    "who-am-i": "¿Quién soy?",
    "who-am-i-text": "Apasionado por la tecnología. Emprendedor constante. Empático y proactivo. Me considero una persona inquieta por aprender. Facilidad para enseñar, explicar y guiar en el aprendizaje a quien me lo permite. Experimentado en desarrollo Java, actualmente conociendo el mundo Cloud.",
    "skills": "Aptitudes",
    "skill1": "Arquitecto de Tecnología - DEVSECOPS",
    "skill2": "Devops",
    "skill3": "SysAdmin",
    "skill4": "Desarrollador SOA",
    "skill5": "Desarrollador Fullstack Java",
    "skill6": "Inglés Intermedio",
    "tools": "Herramientas y Tecnologías",
    "send-email": "Enviarme un mail",
    "download-cv": "Descargar mi CV",
    "download-resume": "Descargar CV en Ingles"
  },
  en: {
    "about-title": "About Me",
    "who-am-i": "Who am I?",
    "who-am-i-text": "Passionate about technology. Constant entrepreneur. Empathetic and proactive. I consider myself a person eager to learn. Ease of teaching, explaining and guiding those who allow me. Experienced in Java development, I am currently exploring the Cloud world.",
    "skills": "Skills",
    "skill1": "Technology Architect - DEVSECOPS",
    "skill2": "Devops",
    "skill3": "SysAdmin",
    "skill4": "SOA Developer",
    "skill5": "Java Fullstack Developer",
    "skill6": "English Intermediate",
    "tools": "Tools and Technologies",
    "send-email": "Send me an email",
    "download-cv": "Download my Spanish Resume",
    "download-resume": "Download my Resume"
  }
};

document.getElementById('flag-es').addEventListener('click', () => setLanguage('es'));
document.getElementById('flag-en').addEventListener('click', () => setLanguage('en'));

function setLanguage(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = translations[lang][key];
  });
}
