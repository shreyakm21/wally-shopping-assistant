import React from 'react';
import { useCompare } from '../context/CompareContext';
import { useNavigate } from 'react-router-dom'; // 🆕 Add at top

function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareItems.length === 0) {
    return <div className="text-center text-gray-500 py-20">No products to compare yet.</div>;
  }

  const features = ['Image', 'Name', 'Price', 'Features'];

  return (
    <div className="py-6">
        <button
            onClick={() => navigate('/chat')}
            className="mb-4 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
            ⬅️ Back to Chat
        </button>
      <h2 className="text-2xl font-bold mb-4">📊 Compare Products</h2>

      <button
        onClick={clearCompare}
        className="mb-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Clear All
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border">Feature</th>
              {compareItems.map((item, i) => (
                <th key={i} className="p-2 border relative">
                  Product {i + 1}
                  <button
                    onClick={() => removeFromCompare(i)}
                    className="absolute top-1 right-2 text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {features.map((feature, i) => (
              <tr key={i}>
                <td className="p-2 border font-semibold bg-gray-50 dark:bg-gray-800">{feature}</td>
                {compareItems.map((item, index) => (
                  <td key={index} className="p-2 border text-sm text-center">
                    {feature === 'Image' ? (
                      <img src={item.image} alt="Product" className="h-20 mx-auto rounded" />
                    ) : feature === 'Name' ? (
                      item.name
                    ) : feature === 'Price' ? (
                      <span className="text-blue-500 font-bold">{item.price}</span>
                    ) : feature === 'Features' ? (
                      <span className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.features}</span>
                    ) : (
                      ''
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compareItems.length >= 3 && (
        <p className="mt-4 text-sm text-gray-500">
          Maximum of 3 products can be compared at a time.
        </p>
      )}
    </div>
  );
}

export default ComparePage;
