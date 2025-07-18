import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import toast from 'react-hot-toast';
import { storePrompt } from '../utils/embeddingUtils';

function ChatBox() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('wally-products');
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState('');
  //const [prompt, setPrompt] = useState('');
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('product-ratings');
    return saved ? JSON.parse(saved) : {};
  });

  const { cartItems, addToCart } = useCart();
  const { addToCompare } = useCompare();

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('wally-products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('product-ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    const tempPrompt = localStorage.getItem('wally-temp-prompt');
    const cachedProducts = localStorage.getItem('wally-products');
    const fromCache = localStorage.getItem('wally-from-cache') === 'true';

    if (tempPrompt) {
      setInput(tempPrompt);

      if (fromCache && cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
      }

      // Cleanup all used keys
      localStorage.removeItem('wally-temp-prompt');
      localStorage.removeItem('wally-products');
      localStorage.removeItem('wally-from-cache');
    }
  }, []);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userPrompt = input.trim();

    try {
      const res = await fetch('http://localhost:5000/wally-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userPrompt }),
      });

      const data = await res.json();

      if (Array.isArray(data.reply)) {
        const newProducts = data.reply.map((p, i) => ({
          ...p,
          image: p.image || `https://source.unsplash.com/400x300/?product&sig=${i}`,
        }));
        setProducts(newProducts);
        localStorage.setItem('wally-products', JSON.stringify(newProducts));

          // ✅ Store prompt with products
        if (data.category) {
          storePrompt(data.category, userPrompt, newProducts);
        }

      } else {
        setProducts([]);
        localStorage.removeItem('wally-products');
      }

      // ✅ Store the categorized prompt if backend sent it
      /*if (data.category) {
        storePrompt(data.category, userPrompt, newProducts);
      }*/

    } catch (error) {
      console.error('Error during sendMessage():', error);
    }

    setInput('');
  };

  const handleNewSearch = () => {
    setProducts([]);
    localStorage.removeItem('wally-products');
    setInput('');
  };

  const handleRating = (productName, rating, product) => {
    const updated = { ...ratings, [productName]: rating };
    setRatings(updated);

    if (rating >= 3) {
      const alreadyInCart = cartItems.some(item => item.name === product.name);
      if (!alreadyInCart) {
        const confirmAdd = window.confirm(`You rated this ${rating} ⭐\nAdd to cart?`);
        if (confirmAdd) {
          addToCart(product);
          toast.success('Item added to cart!');
        }
      } else {
        toast('Product already in cart!');
      }
    }
  };

  return (
    <motion.div
      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-2xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-[500px] overflow-y-auto space-y-4 mb-4 scrollbar-thin pr-2">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-lg flex gap-4 items-start"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={product.image}
              alt="product"
              className="w-32 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-blue-500 font-bold">{product.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{product.features}</p>

              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={`cursor-pointer text-xl ${
                      (ratings[product.name] || 0) >= num ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                    onClick={() => handleRating(product.name, num, product)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => {
                    if (cartItems.some(item => item.name === product.name)) {
                      toast('Product already in cart!');
                    } else {
                      addToCart(product);
                      toast.success('Item added to cart!');
                    }
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => {
                    addToCompare(product);
                    toast.success('Added to compare!');
                  }}
                >
                  Compare
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="mb-4 text-center">
          <button
            onClick={handleNewSearch}
            className="text-sm text-red-500 underline hover:text-red-700"
          >
            🔄 Start New Search
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          className="flex-grow p-2 rounded-md border dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={products.length > 0}
        />
        <button
          onClick={sendMessage}
          disabled={products.length > 0}
          className={`px-4 py-2 rounded-md transition text-white ${
            products.length > 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}

export default ChatBox;
