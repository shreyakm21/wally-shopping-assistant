const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
//const fetch = require('node-fetch'); // Ensure this is installed: npm i node-fetch

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const COHERE_API_KEY = process.env.COHERE_API_KEY;

// 🔁 Load category embeddings once at startup
const categoryEmbeddings = JSON.parse(fs.readFileSync('./categoryEmbeddings.json', 'utf-8'));

// 🧠 Cosine similarity helper
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

// 🔍 Find best matching category
function getBestCategory(userEmbedding) {
  let bestCategory = '';
  let bestScore = -Infinity;

  for (const [category, embedding] of Object.entries(categoryEmbeddings)) {
    const score = cosineSimilarity(userEmbedding, embedding);
    console.log(`🔍 Category: ${category}, Similarity: ${score}`);
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

app.post('/wally-chat', async (req, res) => {
  const prompt = req.body.message;

  try {
    // 1️⃣ Generate products using Cohere
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        prompt: `You are Wally, a smart AI shopping assistant. Based on this query: "${prompt}", respond with 3 product suggestions.

Each product must include:
- A **creative and realistic product name**
- A valid **price (₹)** reflecting the user's budget or request
- 1–2 **specific features** based on what the user is looking for
- A short and clean **image link**, or leave it empty

Respond in pure JSON format like:
[
  { "name": "...", "price": "₹...", "features": "...", "image": "https://..." },
  ...
]`,
        max_tokens: 600,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const rawText = data.generations?.[0]?.text || '';
    const jsonMatch = rawText.match(/\[.*\]/s);

    if (!jsonMatch) {
      console.error('❌ No JSON array found in AI response:', text);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    let parsedProducts;
    try {
      // Try parsing directly
      parsedProducts = JSON.parse(jsonMatch[0]);
    } catch (err) {
      // Fallback: try sanitizing the JSON
      const safeText = jsonMatch[0]
        .replace(/,\s*}/g, '}') // remove trailing commas before }
        .replace(/,\s*]/g, ']'); // remove trailing commas before ]
      try {
        parsedProducts = JSON.parse(safeText);
      } catch (finalErr) {
        console.error('❌ JSON parse failed even after cleanup:', finalErr.message);
        return res.status(500).json({ error: 'Failed to parse AI response' });
      }
    }

    // 2️⃣ Get embedding from Cohere for user prompt
    const embedRes = await fetch('https://api.cohere.ai/v1/embed', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'embed-english-v3.0',
        texts: [prompt],
        input_type: 'search_query'  // required by Cohere now
      }),
    });

    const embedData = await embedRes.json();
    console.log('📦 embedData:', embedData);


    if (!embedData.embeddings || !embedData.embeddings[0]) {
      console.error('🚨 Invalid embedding data from Cohere:', embedData);
      return res.status(500).json({ error: 'Invalid embedding response from Cohere' });
    }

    const userEmbedding = embedData.embeddings[0];
    console.log('🔢 userEmbedding:', userEmbedding);

    if (!userEmbedding) {
      console.error('🚨 Embedding is missing');
      return res.status(500).json({ error: 'No embedding returned' });
    }

    // 3️⃣ Match to best category
    const category = getBestCategory(userEmbedding);
    console.log(`🧠 Prompt categorized as: ${category}`);

    // 4️⃣ Return products + category to frontend
    res.json({
      reply: parsedProducts,
      category,
    });

  } catch (err) {
    console.error('❌ Error in /wally-chat:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Wally backend running at http://localhost:${PORT}`);
});
