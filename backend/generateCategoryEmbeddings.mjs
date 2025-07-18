import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

/*const categories = [
  'Groceries',
  'Tech Deals',
  'Health & Wellness',
  'Stationery',
  'Personal Care',
  'Study Tools'
];*/

const categories = {
  "Tech Deals": "Affordable electronics, budget gadgets, discounted tech accessories, under ₹1000 offers",
  "Health & Wellness": "Yoga mats, fitness gear, supplements, wellness products, resistance bands",
  "Personal Care": "Shampoos, skincare, body lotion, beauty kits, hygiene essentials",
  "Study Tools": "Notebooks, pens, planners, study lamps, exam prep tools",
  'Personal Care': "Shampoos, Face Wash, Toothpaste, Body Lotion, Sanitary Pads, Shaving Cream, Soap, Deodorant",
  "Groceries": "Daily essentials, fresh food, pantry items, kitchen staples"
};


const COHERE_API_KEY = process.env.COHERE_API_KEY;

(async () => {
  const res = await fetch('https://api.cohere.ai/v1/embed', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'embed-english-v3.0',
      texts: categories,
      input_type: 'search_query'
    }),
  });

  const data = await res.json();

  if (!data.embeddings || data.embeddings.length !== categories.length) {
    console.error('Embedding failed:', data);
    return;
  }

  const categoryEmbeddings = {};
  categories.forEach((cat, i) => {
    categoryEmbeddings[cat] = data.embeddings[i];
  });

  fs.writeFileSync('categoryEmbeddings.json', JSON.stringify(categoryEmbeddings, null, 2));
  console.log('✅ categoryEmbeddings.json regenerated successfully.');
})();
