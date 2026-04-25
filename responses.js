// ─────────────────────────────────────────────────────────
// responses.js — Configura aquí tus respuestas y podcasts
// ─────────────────────────────────────────────────────────

const responses = [
  // 🎙️ PODCASTS — agrega tantos episodios como quieras
    {
    keywords: ['episodio1', 'ep1', 'primer episodio'],
    reply: '🎙️ Episodio 1 — [Título del episodio]\n👉 https://tupodcast.com/episodio-1',
  },
  {
    keywords: ['podcast', 'episodio', 'audio', 'escuchar', 'programa'],
    reply:
      '🎙️ ¡Escucha nuestros episodios aquí!\n\n' +
      '📌 Lanzamiento Casacusia: https://youtube.com/shorts/rCqA_jw1q6Y?si=kocfOBhioW1aZN1n' +
      '📚 Todos los episodios: https://tupodcast.com\n' +
      '🎧 Spotify: https://open.spotify.com/show/TU_ID\n' +
      '🍎 Apple Podcasts: https://podcasts.apple.com/TU_ID',
  },
 
    {
    keywords: ['Marce','marce'],
    reply: '🎙️ [Conduciendo a Japon]\n👉 https://youtu.be/u6fBB4MpIE4?si=y2TJO2k5mF9rbtu4',
  },
  {
    keywords: ['episodio 2', 'ep2', 'segundo episodio'],
    reply: '🎙️ Episodio 2 — [Título del episodio]\n👉 https://tupodcast.com/episodio-2',
  },

  // 💰 PRECIOS
  {
    keywords: ['precio', 'costo', 'valor', 'cuánto', 'cuanto', 'tarifa', 'cobran'],
    reply:
      '💰 Puedes ver todos nuestros precios aquí:\n' +
      '👉 https://www.argentina.gob.ar/buscador-de-precios-de-medicamentos' +
      'Si tienes dudas, un asesor te contactará pronto. 😊',
  },

  // ⏰ HORARIOS
  {
    keywords: ['horario', 'atienden', 'disponible', 'cuando', 'cuándo', 'abren'],
    reply:
      '⏰ Nuestro horario de atención:\n\n' +
      '📅 Lunes a Viernes: 9:00 AM – 6:00 PM\n' +
      '📅 Sábados: 10:00 AM – 2:00 PM\n' +
      '🔴 Domingos: Cerrado\n\n' +
      'Fuera de horario te respondemos al día siguiente. 🙏',
  },

  // 📍 UBICACIÓN
  {
    keywords: ['ubicacion', 'ubicación', 'dirección', 'direccion', 'donde', 'dónde', 'mapa'],
    reply:
      '📍 Nos encuentras en:\n' +
      '[Tu dirección completa]\n\n' +
      '🗺️ Ver en Google Maps: https://maps.google.com/?q=TU_UBICACION',
  },

  // 📞 CONTACTO
  {
    keywords: ['contacto', 'teléfono', 'telefono', 'llamar', 'email', 'correo'],
    reply:
      '📞 Medios de contacto:\n\n' +
      '📱 WhatsApp: +549 XXX XXX XXXX\n' +
      '📧 Email: hola@tuweb.com\n' +
      '🌐 Web: https://tuweb.com',
  },

  // 🤝 SERVICIOS
  {
    keywords: ['servicio', 'servicios', 'ofrecen', 'hacen', 'qué venden', 'que venden'],
    reply:
      '✨ Nuestros servicios:\n\n' +
      '• Servicio 1 — descripción breve\n' +
      '• Servicio 2 — descripción breve\n' +
      '• Servicio 3 — descripción breve\n\n' +
      '👉 Más info: https://tuweb.com/servicios',
  },

  // 👋 SALUDOS
  {
    keywords: ['hola', 'buenos días', 'buenos dias', 'buenas tardes', 'buenas noches', 'buenas', 'saludos', 'hey'],
    reply:
      '👋 ¡Hola! Bienvenido/a a [TU MARCA].\n\n' +
      'Soy el asistente virtual. Puedo ayudarte con:\n' +
      '🎙️ Podcast y episodios\n' +
      '💰 Precios y servicios\n' +
      '⏰ Horarios de atención\n' +
      '📍 Ubicación\n\n' +
      '¿Sobre qué te puedo informar?',
  },

  // 🙏 GRACIAS
  {
    keywords: ['gracias', 'muchas gracias', 'thanks', 'perfecto', 'genial', 'excelente'],
    reply: '😊 ¡De nada! Fue un placer ayudarte. Si necesitas algo más, aquí estaré. 🙌',
  },
];

// Respuesta cuando no se reconoce el mensaje
const defaultReply =
  '🤖 Gracias por escribirnos. No entendí bien tu consulta.\n\n' +
  'Puedes preguntarme sobre:\n' +
  '🎙️ Podcast | 💰 Precios | ⏰ Horarios | 📍 Ubicación\n\n' +
  'O si prefieres, un asesor humano te contactará pronto. 😊';

// ─────────────────────────────────────────────────────────
// Motor de búsqueda de keywords
// ─────────────────────────────────────────────────────────
function getReply(text) {
  if (!text) return defaultReply;
  const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const response of responses) {
    const match = response.keywords.some((keyword) => {
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return lower.includes(normalizedKeyword);
    });
    if (match) return response.reply;
  }

  return defaultReply;
}

module.exports = { getReply };
