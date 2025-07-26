const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyC-fYoAUInTWTdqddbpaAWGYSH2HA1CNtk'; 

app.post('/api/gemini-chat', async (req, res) => {
  const { messages, context } = req.body;
  try {
    // System prompt as the first user message for context
    const systemPrompt = `
You are an assistant for BazaarConnect, a platform connecting street food vendors and suppliers.
Website context:
- Purpose: ${context.websitePurpose}
- Current page: ${context.page}
- Language: ${context.language}
Respond helpfully and concisely based on this context and the user's question.
    `.trim();

    // Build conversation history
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY,
      { contents }
    );
    const aiMessage = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ reply: aiMessage });
  } catch (err) {
    res.status(500).json({ reply: 'Error contacting Gemini API.' });
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));