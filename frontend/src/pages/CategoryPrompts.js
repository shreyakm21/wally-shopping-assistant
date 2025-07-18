import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CategoryPrompts() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const navigate = useNavigate();

  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fullMap = JSON.parse(localStorage.getItem('wally_full_map') || '{}');
    const list = fullMap[decodedCategory] || [];
    setPrompts(list);
  }, [decodedCategory]);

  const deletePrompt = (index) => {
    /*const stored = JSON.parse(localStorage.getItem('wally_prompts') || '{}');
    const updated = [...(stored[decodedCategory] || [])];
    updated.splice(index, 1);
    stored[decodedCategory] = updated;
    localStorage.setItem('wally_prompts', JSON.stringify(stored));
    setPrompts(updated);*/

    // ✅ Also update full_map accordingly
    const fullMap = JSON.parse(localStorage.getItem('wally_full_map') || '{}');
    if (fullMap[decodedCategory]) {
      fullMap[decodedCategory] = fullMap[decodedCategory].filter(
        (item, i) => i !== index
      );
      localStorage.setItem('wally_full_map', JSON.stringify(fullMap));
    }
  };

  const handleAskWally = (promptText) => {
    const fullMap = JSON.parse(localStorage.getItem('wally_full_map') || '{}');
    const categoryMap = fullMap[decodedCategory] || [];
    const found = categoryMap.find(p => p.text === promptText);

    localStorage.setItem('wally-temp-prompt', promptText);
    localStorage.setItem('wally-from-cache', 'true'); // ✅ mark it as cache-based

    if (found && found.products) {
      localStorage.setItem('wally-products', JSON.stringify(found.products));
    }

    navigate('/chat');
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white px-6 py-8 transition-colors duration-500">
      <h2 className="text-3xl font-bold mb-6 text-center">🧠 Prompts: {decodedCategory}</h2>

      {prompts.length === 0 ? (
        <p className="text-center text-gray-500">No prompts stored for this category.</p>
      ) : (
        <ul className="max-w-3xl mx-auto space-y-4">
          {prompts.map((prompt, idx) => (
            <li
              key={idx}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <span className="truncate max-w-[60%]">{prompt.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAskWally(prompt.text)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                >
                  Ask Wally
                </button>
                <button
                  onClick={() => deletePrompt(idx)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryPrompts;
