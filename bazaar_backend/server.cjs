require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

app.post('/api/gemini-chat', async (req, res) => {
  const { messages, context } = req.body;
  try {
    // System prompt as the first user message for context
    const systemPrompt = `
You are an intelligent assistant for BazaarConnect, an online platform dedicated to connecting street food vendors with suppliers of ingredients, equipment, and services. 
Website context:
- Purpose: ${context.websitePurpose}
- Current page: ${context.page}
- Language: ${context.language}
Platform details:
- BazaarConnect helps vendors discover new suppliers, compare prices, and manage orders efficiently.
- Suppliers can list their products, respond to vendor inquiries, and offer promotions.
- The platform supports secure messaging, order tracking, and reviews.
- Users may include small business owners, independent vendors, and wholesale suppliers.
Guidelines:
- Provide clear, concise, and helpful answers tailored to the user's needs.
- Reference relevant features or sections of the website when appropriate.
- If a question is outside the platform's scope, politely guide the user to contact support or visit the FAQ.
Respond based on this context and the user's question.
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
