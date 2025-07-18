
import React from 'react';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-white/10 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-105 transition-transform"
      title="Toggle Theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggle;
