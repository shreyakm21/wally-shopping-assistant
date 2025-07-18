import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'Groceries',
  'Tech Deals',
  'Health & Wellness',
  'Stationery',
  'Personal Care',
  'Study Tools',
];

function HomePage() {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Banner */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-xl z-0"
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">🛒 Discover What’s Trending!</h1>
          <p className="mt-4 text-xl">Shop smart, shop with Wally AI 🧠</p>
        </motion.div>
      </section>

    {/* Coming Soon + Branding Outro */}
    <section className="bg-gradient-to-r from-black via-zinc-800 to-sky-900 text-white py-12 px-4 mt-10 rounded-t-3xl shadow-inner">

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">🚀 Coming Soon</h2>
        <p className="text-lg mb-6">
          Walmart stock integration for real-time product availability, local offers & more.
        </p>
        <hr className="border-white/40 my-6" />
        <p className="text-xl font-semibold">✨ Wally – Built for Sparkathon 2025</p>
        <p className="text-md mt-1">By DIT</p>
      </motion.div>
    </section>

      {/* Wally AI Button */}
      <section className="text-center my-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/chat">
            <button className="text-white bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all">
              ✨ Enter Wally AI Chat
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Essentials Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Mart Essentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition shadow-blue-200 dark:shadow-blue-900 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                window.location.href = `/category/${encodeURIComponent(category)}`;
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                Explore top picks in {category.toLowerCase()} for your daily needs.
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
