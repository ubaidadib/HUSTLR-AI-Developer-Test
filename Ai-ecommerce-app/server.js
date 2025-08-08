// server.js - Node.js Express server for AI-powered e-commerce product catalog

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static frontend from /public

// Load products from JSON
let products = [];
try {
  const data = fs.readFileSync('./products.json');
  products = JSON.parse(data);
} catch (err) {
  console.error('❌ Failed to load products.json:', err.message);
}

// OpenAI config (v4 SDK)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Basic product viewer API
app.get('/api/products', (req, res) => {
  res.json(products);
});

// AI search endpoint
app.post('/api/ai-search', async (req, res) => {
  const { query } = req.body;
  console.log('📨 Incoming query:', query);

  const prompt = `Extract filter values as JSON for the following user query:
Query: "${query}"
Return JSON like:
{
  "category": "string (or null)",
  "max_price": number (or null),
  "min_rating": number (or null)
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content.trim();
    console.log('🤖 AI response:', aiResponse);

    let filters;
    try {
      filters = JSON.parse(aiResponse);
    } catch (jsonErr) {
      console.error('❌ Failed to parse AI JSON:', aiResponse);
      return res.status(500).json({ error: 'AI response is not valid JSON.' });
    }

    const filteredProducts = products.filter((p) => {
      return (
        (!filters.category || p.category.toLowerCase().includes(filters.category.toLowerCase())) &&
        (!filters.max_price || p.price <= filters.max_price) &&
        (!filters.min_rating || p.rating >= filters.min_rating)
      );
    });

    console.log('✅ Filters:', filters);
    res.json({ filters, results: filteredProducts });
  } catch (error) {
    console.error('🔥 AI Search Error:', error);
    res.status(500).json({ error: 'Failed to process AI search.' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
