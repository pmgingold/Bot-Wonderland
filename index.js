// ─────────────────────────────────────────────────────────
// index.js — Servidor principal
// WhatsApp Business API + Instagram DMs
// ─────────────────────────────────────────────────────────

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { getReply } = require('./responses');
// const { getAIReply } = require('./ai'); // ← Descomenta para usar IA en lugar de keywords

const app = express();
app.use(express.json());

// ── Variables de entorno ──────────────────────────────────
const {
  WA_TOKEN,
  PHONE_NUMBER_ID,
  IG_TOKEN,
  VERIFY_TOKEN,
  PORT = 3000,
} = process.env;

// ─────────────────────────────────────────────────────────
// WEBHOOK — Verificación inicial (GET)
// Meta llama a esta ruta una sola vez para verificar tu URL
// ─────────────────────────────────────────────────────────
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verificado correctamente');
    res.status(200).send(challenge);
  } else {
    console.error('❌ Token de verificación incorrecto');
    res.sendStatus(403);
  }
});

// ─────────────────────────────────────────────────────────
// WEBHOOK — Recibir mensajes (POST)
// ─────────────────────────────────────────────────────────
app.post('/webhook', async (req, res) => {
  // Responder 200 inmediatamente (Meta requiere respuesta rápida)
  res.sendStatus(200);

  const body = req.body;

  try {
    // ── WhatsApp ──────────────────────────────────────────
    if (body.object === 'whatsapp_business_account') {
      const changes = body.entry?.[0]?.changes?.[0]?.value;
      const messages = changes?.messages;

      if (messages && messages.length > 0) {
        const msg = messages[0];

        // Solo procesar mensajes de texto
        if (msg.type === 'text') {
          const from = msg.from;        // Número del usuario
          const text = msg.text?.body;  // Texto del mensaje

          console.log(`📱 WhatsApp | De: ${from} | Mensaje: ${text}`);

          const reply = getReply(text);
          // const reply = await getAIReply(text); // ← Para usar IA

          await sendWhatsApp(from, reply);
        }
      }
    }

    // ── Instagram DMs ─────────────────────────────────────
    if (body.object === 'instagram') {
      const messaging = body.entry?.[0]?.messaging?.[0];

      // Ignorar mensajes propios (is_echo) y sin texto
      if (messaging?.message && !messaging.message.is_echo && messaging.message.text) {
        const senderId = messaging.sender.id;
        const text = messaging.message.text;

        console.log(`📸 Instagram | De: ${senderId} | Mensaje: ${text}`);

        const reply = getReply(text);
        // const reply = await getAIReply(text); // ← Para usar IA

        await sendInstagram(senderId, reply);
      }
    }
  } catch (error) {
    console.error('❌ Error procesando mensaje:', error.message);
  }
});

// ─────────────────────────────────────────────────────────
// ENVIAR MENSAJE — WhatsApp
// ─────────────────────────────────────────────────────────
async function sendWhatsApp(to, message) {
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${WA_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`✅ WhatsApp enviado a ${to}`);
  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error.response?.data || error.message);
  }
}

// ─────────────────────────────────────────────────────────
// ENVIAR MENSAJE — Instagram
// ─────────────────────────────────────────────────────────
async function sendInstagram(recipientId, message) {
  try {
    await axios.post(
      'https://graph.facebook.com/v19.0/me/messages',
      {
        recipient: { id: recipientId },
        message: { text: message },
      },
      {
        headers: {
          Authorization: `Bearer ${IG_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`✅ Instagram enviado a ${recipientId}`);
  } catch (error) {
    console.error('❌ Error enviando Instagram:', error.response?.data || error.message);
  }
}

// ─────────────────────────────────────────────────────────
// Ruta de salud (útil para verificar que el servidor corre)
// ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '🤖 Bot activo y funcionando' });
});

// ─────────────────────────────────────────────────────────
// INICIAR SERVIDOR
// ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 Webhook URL: https://TU-SERVIDOR.railway.app/webhook`);
});
