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
    // System prompt with template literals properly wrapped
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
- If a question is outside the platform's scope, politely guide the user to contact support.
Suppliers:
- Ram Kisan - Onion, Tomato, Peas  
- Green Fresh Supplies - Tomato, Capsicum, Cabbage  
- Mumbai Spice Co. - Coriander, Radish  
- Fresh Valley - Potato, Onion  
- Organic Farms - Green Chilli, Okra, Spinach  
- City Vegetables - Carrot, Turnip  
- Fresh Mart - Cabbage, Brinjal  
- Veggie Hub - Okra, Spinach, Tomato  
- Daily Greens - Brinjal, Bottle Gourd  
- Nature's Basket - Capsicum, Peas, Carrot  
- Farm Fresh - Bottle Gourd, Tomato, Onion  
- Urban Veggies - Spinach, Green Chilli, Peas  
- Healthy Harvest - Radish, Cabbage, Turnip  
- Veggie Delight - Pumpkin, Carrot, Brinjal  
- Fresh Basket - Peas, Onion, Tomato, Okra  
- Sabzi Junction - Cucumber, Spinach, Capsicum  
- Harvest Cart - Tomato, Pumpkin, Green Chilli  
- Krishi Veggies - Peas, Carrot, Radish, Cabbage  
- Desi Trolley - Okra, Bottle Gourd, Brinjal  
- Local Basket - Turnip, Cucumber, Spinach, Onion  

- If the user asks for a product, suggest suppliers who sells it.
- If no supplier has the requested product, suggest a random supplier.
Respond based on this context and the user's question.
Keep responses very concise and to the point only.
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      }
    );

    const aiMessage = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ reply: aiMessage });

  } catch (err) {
    console.error('Gemini API Error:', err?.response?.data || err.message);
    res.status(500).json({ reply: 'Error contacting Gemini API.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
