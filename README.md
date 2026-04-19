# 🤖 Bot Asistente Virtual — WhatsApp & Instagram

## Archivos del proyecto

```
bot-redes/
├── index.js        ← Servidor principal (no tocar mucho)
├── responses.js    ← TUS RESPUESTAS Y PODCASTS (editar aquí)
├── ai.js           ← Integración con Claude AI (opcional)
├── .env            ← Tus credenciales (crear desde .env.example)
└── package.json    ← Dependencias
```

---

## 🚀 Pasos para correrlo

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus tokens de Meta
```

### 3. Correr localmente
```bash
node index.js
```

---

## ✏️ Cómo personalizar

### Cambiar respuestas y agregar podcasts
Edita el archivo `responses.js`:
- Agrega nuevos objetos al array `responses`
- Cada objeto tiene `keywords` (palabras que activan la respuesta) y `reply` (la respuesta)
- Cambia los links de tu podcast en la entrada con keyword `'podcast'`

### Cambiar al modo IA (Claude)
En `index.js`, comenta la línea con `getReply` y descomenta `getAIReply`.
Edita el `SYSTEM_PROMPT` en `ai.js` con la información de tu negocio.

---

## 📦 Deploy en Railway

1. Sube este código a GitHub
2. Entra a railway.app > New Project > Deploy from GitHub
3. Agrega las variables de entorno en Settings > Variables
4. Copia la URL generada (ej: https://tu-app.railway.app)
5. Pega esa URL en Meta como Webhook: `https://tu-app.railway.app/webhook`
