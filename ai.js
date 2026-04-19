// ─────────────────────────────────────────────────────────
// ai.js — Respuestas inteligentes con Claude (opcional)
// Úsalo en lugar de responses.js si quieres IA
// ─────────────────────────────────────────────────────────

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// 👇 Personaliza este prompt con tu marca e información
const SYSTEM_PROMPT = `
Eres el asistente virtual de [TU MARCA]. Tu trabajo es responder mensajes de WhatsApp e Instagram de forma amable, breve y útil.

INFORMACIÓN DE TU NEGOCIO:
- Nombre: [TU MARCA]
- Descripción: [Qué hace tu negocio]
- Web: https://tuweb.com

PODCAST:
- Si preguntan por el podcast o episodios, envíalos a: https://tupodcast.com
- Spotify: https://open.spotify.com/show/TU_ID
- Apple Podcasts: https://podcasts.apple.com/TU_ID

PRECIOS:
- Si preguntan por precios, envíalos a: https://tuweb.com/precios

HORARIOS:
- Lunes a Viernes: 9am - 6pm
- Sábados: 10am - 2pm

UBICACIÓN:
- [Tu dirección]
- Google Maps: https://maps.google.com/?q=TU_UBICACION

REGLAS:
1. Responde SIEMPRE en español
2. Sé amable y usa algún emoji relevante
3. Máximo 3-4 oraciones por respuesta
4. Si no sabes algo, di que un asesor lo contactará pronto
5. No inventes información que no está en este prompt
`;

async function getAIReply(userMessage) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error con Claude AI:', error.message);
    // Fallback si falla la IA
    return '😊 Gracias por escribirnos. Un asesor te contactará pronto.';
  }
}

module.exports = { getAIReply };
