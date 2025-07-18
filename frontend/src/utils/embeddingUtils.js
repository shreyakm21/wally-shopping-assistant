// cosineSimilarity: calculates similarity between two vectors
export function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (magA * magB);
}

// getBestCategory: finds the most semantically similar category
export function getBestCategory(promptEmbedding, categoryEmbeddings) {
  let bestCategory = null;
  let highestSimilarity = -Infinity;

  for (const [category, vectors] of Object.entries(categoryEmbeddings)) {
    for (const vec of vectors) {
      const sim = cosineSimilarity(promptEmbedding, vec);
      if (sim > highestSimilarity) {
        highestSimilarity = sim;
        bestCategory = category;
      }
    }
  }

  return bestCategory;
}

// storePrompt: stores both prompt text and product list
export function storePrompt(category, promptText, products = []) {
  if (!category || typeof category !== 'string' || !promptText || typeof promptText !== 'string') {
    console.warn('🛑 storePrompt() called with invalid inputs:', { category, promptText });
    return;
  }

  const promptMap = JSON.parse(localStorage.getItem('wally_prompts') || '{}');
  const fullMap = JSON.parse(localStorage.getItem('wally_full_map') || '{}');

  if (!promptMap[category]) 
    promptMap[category] = [];
  if (!fullMap[category]) 
    fullMap[category] = [];

  // ✅ Check if already exists (case-insensitive)
  const exists = promptMap[category].some(p =>
    typeof p === 'string' && p.toLowerCase() === promptText.toLowerCase()
  );
  if (exists) 
    return;

  // ✅ Push promptText to promptMap (just string, for clean display)
  promptMap[category].unshift(promptText);
  if (promptMap[category].length > 4) {
    promptMap[category] = promptMap[category].slice(0, 4);
  }

  // ✅ Push full object {text, products} to fullMap
  fullMap[category].unshift({ text: promptText, products });
  if (fullMap[category].length > 4) {
    fullMap[category] = fullMap[category].slice(0, 4);
  }

  localStorage.setItem('wally_prompts', JSON.stringify(promptMap));
  localStorage.setItem('wally_full_map', JSON.stringify(fullMap));

  console.log(`🧠 Storing prompt: ${promptText} under category: ${category}`);
}

